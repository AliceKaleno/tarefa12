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

export default function App() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("Buy"); 

  const holdings = {
    USD: 250,
    EUR: 200,
    GBP: 100,
    JPY: 12000,
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD,EUR,GBP,JPY"
        );
        const data = await response.json();

        const formatted = {};
        Object.keys(data).forEach((key) => {
          const item = data[key];
          formatted[item.code] = item;
        });

        setRates(formatted);
      } catch (err) {
        console.log("Erro ao buscar API:", err);
        setRates(null);
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
    const convertedBRL =
      mode === "Sell"
        ? -sampleAmount * parseFloat(r.bid)
        : sampleAmount * parseFloat(r.bid);

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
          <Text
            style={[
              styles.valueSmall,
              { color: mode === "Sell" ? "#e63946" : "#0aa868" },
            ]}
          >
            R$ {toBRL(convertedBRL)}
          </Text>
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

  if (!rates) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ margin: 20, fontSize: 16, color: "red" }}>
          Erro ao carregar cotações. Verifique sua conexão e tente novamente.
        </Text>
      </SafeAreaView>
    );
  }

  const totalBRL = calcTotalBRL();
  const items = Object.entries(rates);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>My Project</Text>
        <Text style={styles.sub}>Current balance</Text>
        <Text style={styles.balance}>R$ {toBRL(totalBRL)}</Text>

        <Text
          style={[
            styles.modeText,
            { color: mode === "Sell" ? "#e63946" : "#0aa868" },
          ]}
        >
          Modo atual: {mode === "Sell" ? "Venda" : "Compra"}
        </Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, mode === "Buy" && styles.toggleActive]}
            onPress={() => setMode("Buy")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "Buy" && styles.toggleTextActive,
              ]}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, mode === "Sell" && styles.toggleActiveLight]}
            onPress={() => setMode("Sell")}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "Sell" && styles.toggleTextActiveDark,
              ]}
            >
              Sell
            </Text>
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
  return Number(num).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatCurrencyDisplay(amount, code) {
  if (["JPY"].includes(code)) {
    return `${code} ${Math.round(amount)}`;
  }
  if (["BTC", "ETH", "LTC", "XRP", "DOGE"].includes(code)) {
    return `${amount} ${code}`;
  }
  return `${code} ${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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
    marginBottom: 8,
  },
  sub: {
    alignSelf: "flex-start",
    fontSize: 12,
    color: "#888",
  },
  balance: {
    fontSize: 36,
    fontWeight: "700",
    marginVertical: 12,
  },
  modeText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
    backgroundColor: "#eee",
    marginHorizontal: 6,
  },
  toggleActive: {
    backgroundColor: "#6f2dbd",
  },
  toggleActiveLight: {
    backgroundColor: "#f2dede",
  },
  toggleText: {
    color: "#666",
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#fff",
  },
  toggleTextActiveDark: {
    color: "#e63946",
    fontWeight: "700",
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
    elevation: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6f2dbd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  circleText: {
    color: "#fff",
    fontWeight: "700",
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "700",
  },
  currencyName: {
    fontSize: 12,
    color: "#888",
  },
  right: {
    alignItems: "flex-end",
  },
  valueMain: {
    fontSize: 16,
    fontWeight: "700",
  },
  valueSmall: {
    fontSize: 12,
    marginTop: 4,
  },
});
