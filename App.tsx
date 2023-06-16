import React, {useState} from 'react';
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

const dataMockup = {
  data: {
    data_type: 'hourly',
    x_labels: [
      '05:00:00',
      '06:00:00',
      '07:00:00',
      '08:00:00',
      '09:00:00',
      '10:00:00',
      '11:00:00',
      '12:00:00',
      '13:00:00',
      '14:00:00',
      '15:00:00',
      '16:00:00',
      '17:00:00',
    ],
    generation: [0, 0, 0, 0.4, 4.9, 9.3, 12.5, 13.5, 13.8, 12.0, 1.5, 1.9, 2.2],
    expected: [113.325],
    totals: {
      kwh: 72.0,
      percentage: 63.53,
      trees: 0.04,
      co2: 8.96,
    },
  },
};

export default function App() {
  //const optionsTranslate = ['hourly', 'daily', 'monthly', 'yearly'];
  const options = ['Hora', 'Dia', 'Mês', 'Ano'];
  const [filter, setFilter] = useState('');
  const [showGraphics, setShowGraphics] = useState(false);

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
                    } else {
                      setShowGraphics(false);
                    }
                  }}>
                  <Text>Buscar</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showGraphics && (
              <View>
                <Text>Graphics</Text>
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
});
