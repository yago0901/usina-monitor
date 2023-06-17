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
import {VictoryBar, VictoryChart} from 'victory-native';
import axios from 'axios';

export default function App() {
  const options = ['Hora', 'Dia', 'Mês', 'Ano'];
  const [filter, setFilter] = useState('');
  const [showGraphics, setShowGraphics] = useState(false);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://y-plants-api.bravedesert-7b0b5672.westus2.azurecontainerapps.io/plant/generation/test-2023',
        {
          headers: {
            Authorization: 'Bearer HeDKyixt_yMhR4TOvL4HNktaOxga-mgLkUcF',
          },
          params: {
            dataType: 'hourly',
          },
        },
      );

      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showGraphics) {
      fetchData();
    }
  }, [showGraphics]);

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
          <View style={styles.description}>
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
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.pickerComponente}
                  selectedValue={filter}
                  onValueChange={itemValue => setFilter(itemValue)}>
                  <Picker.Item key={1} value={1} label={options[0]} />
                  <Picker.Item key={2} value={2} label={options[1]} />
                  <Picker.Item key={3} value={3} label={options[2]} />
                  <Picker.Item key={4} value={4} label={options[3]} />
                </Picker>
                <TouchableOpacity
                  onPress={() => {
                    if (showGraphics === false) {
                      setShowGraphics(true);
                      fetchData();
                    } else {
                      setShowGraphics(false);
                    }
                  }}>
                  <Text>Buscar</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showGraphics && (
              <View style={styles.status2}>
                <Text>Graphics</Text>
                <VictoryChart domainPadding={{x: 20}}>
                  <VictoryBar
                    style={{
                      data: {fill: '#c43a31'},
                    }}
                    data={[
                      {x: 1, y: 1},
                      {x: 2, y: 2},
                      {x: 3, y: 3},
                      {x: 4, y: 4},
                    ]}
                  />
                </VictoryChart>
              </View>
            )}
          </View>
          <Text>Dados da API:</Text>
          <Text>{JSON.stringify(data)}</Text>
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
  description: {
    margin: 8,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});
