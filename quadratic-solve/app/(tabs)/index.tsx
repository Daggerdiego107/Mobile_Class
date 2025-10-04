import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Index() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [root1, setRoot1] = useState("");
  const [root2, setRoot2] = useState("");

  const calculateRoots = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      Alert.alert("Error", "Please enter valid numbers for a, b, and c.");
      return;
    }

    if (numA === 0) {
      Alert.alert("Warning", "This is not a 2nd grade equation because 'a' = 0.");
      return;
    }

    const discriminant = numB * numB - 4 * numA * numC;
    const twoA = 2 * numA;

    if (discriminant > 0) {
      // Two real roots
      const r1 = (-numB + Math.sqrt(discriminant)) / twoA;
      const r2 = (-numB - Math.sqrt(discriminant)) / twoA;
      setRoot1(r1.toFixed(2));
      setRoot2(r2.toFixed(2));
    } else if (discriminant === 0) {
      // One double root
      const r = -numB / twoA;
      setRoot1(r.toFixed(2));
      setRoot2(r.toFixed(2));
    } else {
      // Complex roots
      const realPart = (-numB / twoA).toFixed(2);
      const imaginaryPart = (Math.sqrt(-discriminant) / twoA).toFixed(2);
      setRoot1(`${realPart} + ${imaginaryPart}i`);
      setRoot2(`${realPart} - ${imaginaryPart}i`);
    }
  };

  const resetFields = () => {
    setA("");
    setB("");
    setC("");
    setRoot1("");
    setRoot2("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ecuaciones de segundo grado</Text>
      <Text style={styles.equation}>ax² + bx + c = 0</Text>

      <View style={styles.row}>
        <Text style={styles.label}>a:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={a}
          onChangeText={setA}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>b:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={b}
          onChangeText={setB}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>c:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={c}
          onChangeText={setC}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateRoots}>
        <Text style={styles.buttonText}>Resolver</Text>
      </TouchableOpacity>

      {root1 !== "" && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Raíz 1:</Text>
            <TextInput style={styles.input} editable={false} value={root1} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Raíz 2:</Text>
            <TextInput style={styles.input} editable={false} value={root2} />
          </View>
        </>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
        <Text style={styles.resetText}>Resetear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef0f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  equation: {
    fontSize: 28,
    fontStyle: "italic",
    marginBottom: 20,
  },
   row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  label: {
    width: 70, // give it a bit more room
    fontSize: 18,
    textAlign: "right",
    marginRight: 8,
  },
  input: {
    flex: 1,
    maxWidth: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 18,
  },
  resetButton: {
    marginTop: 20,
  },
  resetText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "600",
  },
});
