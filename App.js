import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";

const FALLBACK_DATA = {
  "USD":{"code":"USD","codein":"BRL","name":"Dólar Americano/Real Brasileiro","high":"5.2962","low":"5.26139","varBid":"-0.0117","pctChange":"-0.221113","bid":"5.2797","ask":"5.2827","timestamp":"1763036425","create_date":"2025-11-13 09:20:25"},
  "USDT":{"code":"USD","codein":"BRLT","name":"Dólar Americano/Real Brasileiro Turismo","high":"5.33411","low":"5.29905","varBid":"-0.01179","pctChange":"-0.221229","bid":"5.31749","ask":"5.48201","timestamp":"1763036425","create_date":"2025-11-13 09:20:25"},
  "CAD":{"code":"CAD","codein":"BRL","name":"Dólar Canadense/Real Brasileiro","high":"3.78246","low":"3.7583","varBid":"-0.005947","pctChange":"-0.157495","bid":"3.77004","ask":"3.77931","timestamp":"1763036063","create_date":"2025-11-13 09:14:23"},
  "GBP":{"code":"GBP","codein":"BRL","name":"Libra Esterlina/Real Brasileiro","high":"6.96967","low":"6.92178","varBid":"0.002105","pctChange":"0.030305","bid":"6.94835","ask":"6.95229","timestamp":"1763036425","create_date":"2025-11-13 09:20:25"},
  "ARS":{"code":"ARS","codein":"BRL","name":"Peso Argentino/Real Brasileiro","high":"0.00376195","low":"0.00374485","varBid":"-0.000005","pctChange":"-0.123294","bid":"0.00375068","ask":"0.00375071","timestamp":"1763036422","create_date":"2025-11-13 09:20:22"},
  "BTC":{"code":"BTC","codein":"BRL","name":"Bitcoin/Real Brasileiro","high":"556159","low":"533966","varBid":"-11388","pctChange":"-2.05","bid":"544254","ask":"544255","timestamp":"1763036425","create_date":"2025-11-13 09:20:25"},
  "LTC":{"code":"LTC","codein":"BRL","name":"Litecoin/Real Brasileiro","high":"551","low":"504.3","varBid":"-12.3","pctChange":"-2.27","bid":"528.7","ask":"529.8","timestamp":"1763036422","create_date":"2025-11-13 09:20:22"},
  "EUR":{"code":"EUR","codein":"BRL","name":"Euro/Real Brasileiro","high":"6.15385","low":"6.10874","varBid":"-0.003759","pctChange":"-0.061307","bid":"6.12745","ask":"6.14251","timestamp":"1763036063","create_date":"2025-11-13 09:14:23"},
  "JPY":{"code":"JPY","codein":"BRL","name":"Iene Japonês/Real Brasileiro","high":"0.03428595","low":"0.03399669","varBid":"-0.000075","pctChange":"-0.219181","bid":"0.03412522","ask":"0.03414461","timestamp":"1763036425","create_date":"2025-11-13 09:20:25"},
  "CHF":{"code":"CHF","codein":"BRL","name":"Franco Suíço/Real Brasileiro","high":"6.65871","low":"6.60793","varBid":"0.00279","pctChange":"0.042088","bid":"6.63223","ask":"6.64853","timestamp":"1763036063","create_date":"2025-11-13 09:14:23"},
  "AUD":{"code":"AUD","codein":"BRL","name":"Dólar Australiano/Real Brasileiro","high":"3.48066","low":"3.45516","varBid":"0.005496","pctChange":"0.158972","bid":"3.46277","ask":"3.47127","timestamp":"1763036063","create_date":"2025-11-13 09:14:23"},
  "CNY":{"code":"CNY","codein":"BRL","name":"Yuan Chinês/Real Brasileiro","high":"0.74429134","low":"0.73906678","varBid":"0.003389","pctChange":"0.4578","bid":"0.74372891","ask":"0.74540015","timestamp":"1762991935","create_date":"2025-11-12 20:58:55"},
  "ILS":{"code":"ILS","codein":"BRL","name":"Novo Shekel Israelense/Real Brasileiro","high":"1.65737","low":"1.641","varBid":"-0.009","pctChange":"-0.545453","bid":"1.641","ask":"1.65","timestamp":"1763036423","create_date":"2025-11-13 09:20:23"},
  "ETH":{"code":"ETH","codein":"BRL","name":"Ethereum/Real Brasileiro","high":"18970.37","low":"17864.93","varBid":"-370.87","pctChange":"-1.971","bid":"18436.67","ask":"18445.37","timestamp":"1763036427","create_date":"2025-11-13 09:20:27"},
  "XRP":{"code":"XRP","codein":"BRL","name":"XRP/Real Brasileiro","high":"13.373","low":"12.271","varBid":"0.208","pctChange":"1.613","bid":"13.097","ask":"13.098","timestamp":"1763036426","create_date":"2025-11-13 09:20:26"},
  "DOGE":{"code":"DOGE","codein":"BRL","name":"Dogecoin/Real Brasileiro","high":"0.9448","low":"0.8864","varBid":"-0.0004","pctChange":"-0.043","bid":"0.9293","ask":"0.9298","timestamp":"1763036427","create_date":"2025-11-13 09:20:27"}
};

export default function App() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("Buy"); 

  
  const holdings = {
    USD: 250,    
    EUR: 200,    
    GBP: 100,    
    JPY: 12000   
  };

  useEffect(() => {
    // Tenta buscar de um endpoint real (substitua por sua URL se houver).
    // Se falhar, usa fallback.
    const fetchRates = async () => {
      try {
        // Coloque aqui a url real se tiver: e.g. const resp = await fetch("https://sua-api.com/last/USD,EUR,...");
        // Para este exercício, tentamos uma fetch genérica com timeout breve e caímos no fallback.
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000);

        // Exemplo: tentar um endpoint (comentado). Vai cair no catch se não existir.
        // const response = await fetch("https://api-exemplo/last", { signal: controller.signal });
        // const data = await response.json();

        clearTimeout(id);

        
        setRates(FALLBACK_DATA);
      } catch (err) {
        
        setRates(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const calcTotalBRL = () => {
    if (!rates) return 0;
    let total = 0;
    Object.keys(holdings).forEach((code) => {
      const amount = holdings[code] || 0;
      const r = rates[code];
      if (r && r.bid) {
        const bid = parseFloat(r.bid);
      
        total += amount * bid;
      }
    });
    return total;
  };

  const renderItem = ({ item }) => {
    const code = item[0];
    const r = item[1];
    const sampleAmount = holdings[code] ?? 1; 
    const convertedBRL = sampleAmount * parseFloat(r.bid);
    return (
      <View style={styles.card}>
        <View style={styles.left}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{code}</Text>
          </View>
          <View>
            <Text style={styles.currencyCode}>{code}</Text>
            <Text style={styles.currencyName}>{r.name}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={styles.valueMain}>
            {formatCurrencyDisplay(sampleAmount, code)}
          </Text>
          <Text style={styles.valueSmall}>R$ {toBRL(convertedBRL)}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>Carregando cotações...</Text>
      </SafeAreaView>
    );
  }

  const totalBRL = calcTotalBRL();
  const items = Object.entries(rates);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>My project</Text>
        <Text style={styles.sub}>Current balance</Text>
        <Text style={styles.balance}>$ {toBRL(totalBRL)}</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, mode === "Buy" && styles.toggleActive]}
            onPress={() => setMode("Buy")}
          >
            <Text style={[styles.toggleText, mode === "Buy" && styles.toggleTextActive]}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, mode === "Sell" && styles.toggleActiveLight]}
            onPress={() => setMode("Sell")}
          >
            <Text style={[styles.toggleText, mode === "Sell" && styles.toggleTextActive]}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item[0]}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
}

function toBRL(num) {
  if (isNaN(num)) return "0,00";
  return Number(num).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatCurrencyDisplay(amount, code) {
  if (["JPY"].includes(code)) {
    return `${code} ${Math.round(amount)}`;
  }
  if (["BTC","ETH","LTC","XRP","DOGE"].includes(code)) {
    return `${amount} ${code}`;
  }
  return `${code} ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8
  },
  sub: {
    alignSelf: "flex-start",
    fontSize: 12,
    color: "#888",
  },
  balance: {
    fontSize: 36,
    fontWeight: "700",
    marginVertical: 12
  },
  toggleRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
    backgroundColor: "#eee",
    marginHorizontal: 6
  },
  toggleActive: {
    backgroundColor: "#6f2dbd"
  },
  toggleActiveLight: {
    backgroundColor: "#efe8f8"
  },
  toggleText: {
    color: "#666",
    fontWeight: "600"
  },
  toggleTextActive: {
    color: "#fff"
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6f2dbd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  circleText: {
    color: "#fff",
    fontWeight: "700"
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "700"
  },
  currencyName: {
    fontSize: 12,
    color: "#888",
  },
  right: {
    alignItems: "flex-end"
  },
  valueMain: {
    fontSize: 16,
    fontWeight: "700"
  },
  valueSmall: {
    fontSize: 12,
    color: "#0aa868",
    marginTop: 4
  }
});
