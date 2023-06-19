import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import axios from 'axios';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

export default function App() {
  const options = ['Hora', 'Dia', 'Mês', 'Ano'];
  const [filter, setFilter] = useState('');
  const [showGraphics, setShowGraphics] = useState(false);
  const [xLabelFormat, setXLabelFormat] = useState('');

  const [data, setData] = useState({
    data_type: '',
    x_labels: [],
    generation: [],
    expected: [],
    totals: {
      kwh: 0,
      percentage: 0,
      trees: 0,
      co2: 0,
    },
  });

  const [apiUrl, setApiUrl] = useState('');

  const buildApiUrl = (dataType: string) => {
    const baseUrl =
      'https://y-plants-api.bravedesert-7b0b5672.westus2.azurecontainerapps.io/plant/generation/test-2023';
    let url = '';

    if (dataType === 'Hora') {
      url = `${baseUrl}?dataType=hourly`;
      setXLabelFormat('HH:mm');
    } else if (dataType === 'Dia') {
      url = `${baseUrl}?dataType=daily`;
      setXLabelFormat('dd');
    } else if (dataType === 'Mês') {
      url = `${baseUrl}?dataType=monthly`;
      setXLabelFormat('MMM');
    } else if (dataType === 'Ano') {
      url = `${baseUrl}?dataType=yearly`;
      setXLabelFormat('yyyy');
    }

    return url;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: 'Bearer HeDKyixt_yMhR4TOvL4HNktaOxga-mgLkUcF',
        },
      });

      const {data: responseData} = response;
      const {data_type, x_labels, generation} = responseData.data;

      let formattedXLabels: never[] = [];
      if (data_type === 'hourly') {
        formattedXLabels = x_labels.map(
          (x_label: any) =>
            format(new Date(`2023-01-01T${x_label}`), xLabelFormat),
          {
            locale: ptBR,
          },
        );
      } else if (data_type === 'daily') {
        formattedXLabels = x_labels.map((x_label: any) =>
          format(new Date(x_label), xLabelFormat, {locale: ptBR}),
        );
      } else if (data_type === 'monthly') {
        formattedXLabels = x_labels.map((x_label: any) =>
          format(new Date(x_label), xLabelFormat, {locale: ptBR}),
        );
      } else if (data_type === 'yearly') {
        formattedXLabels = x_labels.map((x_label: any) =>
          format(new Date(x_label), xLabelFormat, {locale: ptBR}),
        );
      }

      setData(prevData => ({
        ...prevData,
        data_type,
        x_labels: formattedXLabels,
        generation,
        totals: responseData.data.totals,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (apiUrl) {
      fetchData();
    }
  }, [apiUrl, filter]);

  useEffect(() => {
    setApiUrl(buildApiUrl(filter));
  }, [filter]);

  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <ImageBackground
        source={require('./src/img/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Usina Monitor</Text>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.descriptionTitle}>
              Nome: Usina Solar Yellot
            </Text>
            <Text style={styles.descriptionTitle}>Usina: Solaris</Text>
            <Text style={styles.descriptionTitle}>
              Endereço: Rua Sem Poluição, 100
            </Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusTitle}>Status</Text>
            <Image
              style={styles.statusLogo}
              source={require('./src/img/status.png')}
            />
          </View>
          <View>
            <View style={styles.status}>
              <Text style={styles.graphicTitle}>Gráfico</Text>
              <Text style={styles.graphicSubTitle}>
                Selecione hora, dia, mês ou ano
              </Text>
              <View style={styles.pickerContainer}>
                <View>
                  <Picker
                    style={styles.pickerComponente}
                    selectedValue={filter}
                    onValueChange={itemValue => {
                      const selectedOption = options[itemValue - 1];
                      setFilter(itemValue);
                      setApiUrl(buildApiUrl(selectedOption));
                    }}>
                    <Picker.Item
                      key={0}
                      value={null}
                      label="Selecione"
                      enabled={false}
                    />

                    <Picker.Item key={1} value={1} label={options[0]} />
                    <Picker.Item key={2} value={2} label={options[1]} />
                    <Picker.Item key={3} value={3} label={options[2]} />
                    <Picker.Item key={4} value={4} label={options[3]} />
                  </Picker>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowGraphics(!showGraphics);
                  }}>
                  <Text>{showGraphics ? 'Fechar' : 'Mostrar'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showGraphics && (
              <View style={styles.status2}>
                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={{x: [15, 15], y: 5}}
                  width={375}
                  height={200}>
                  <VictoryAxis
                    style={{
                      tickLabels: {
                        fontSize: 7.5,
                      },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    orientation="left"
                    style={{tickLabels: {fontSize: 15}}}
                  />
                  <VictoryBar
                    style={{
                      data: {fill: '#c43a31'},
                    }}
                    animate={{
                      duration: 1000,
                      onLoad: {duration: 500},
                    }}
                    data={data.x_labels.map((x_label, index) => ({
                      x: x_label,
                      y: data.generation[index],
                    }))}
                  />
                </VictoryChart>
                <View style={styles.containerDescription}>
                  <Text style={styles.textDescription}>
                    Total de energia gerada = {data.totals?.kwh}kWh
                  </Text>
                  <Text style={styles.textDescription}>
                    Carbono evitado = {data.totals?.co2}kg
                  </Text>
                  <Text style={styles.textDescription}>
                    Árvores salvas = {data.totals?.trees}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  topBar: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  body: {
    marginLeft: '15%',
    marginRight: '15%',
  },
  descriptionTitle: {
    color: '#000000',
    fontSize: 15,
  },
  status: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statusLogo: {
    width: 40,
    height: 40,
  },
  graphicTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },
  graphicSubTitle: {
    color: '#000000',
    fontSize: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerComponente: {
    width: 150,
  },
  status2: {
    height: 100,
    alignItems: 'center',
  },
  containerDescription: {
    alignItems: 'center',
  },
  textDescription: {
    color: '#000000',
    fontSize: 15,
  },
});
