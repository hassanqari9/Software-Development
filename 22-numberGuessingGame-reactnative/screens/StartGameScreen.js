import { useState } from 'react'
import { StyleSheet, TextInput, View, Alert, Text } from 'react-native'

import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import Colors from '../constants/colors'

function StartGameScreen({ onPickNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('')

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }
    function resetInputHandler() {
        setEnteredNumber('')
    }
    function confirmInputHandler() {
        const choosenNumber = parseInt(enteredNumber)

        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 & 99',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                }]
            )
            return
        }

        onPickNumber(choosenNumber)
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess my number</Title>
            <Card>
                <Text style={styles.instructionText}>Enter a Number</Text>
                <TextInput style={styles.numberInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}
export default StartGameScreen

const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily: 'open-sans'
    },
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})