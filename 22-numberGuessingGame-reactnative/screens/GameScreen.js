import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import GuessLogItem from '../components/game/GuessLogItem';

import Colors from '../constants/colors';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentGuess == userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])
    useEffect(() => {
        minBoundary = 1,
        maxBoundary = 100
    }, [])

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'higher' && currentGuess > userNumber))
        {
            Alert.alert("Don't lie", "You know that this is wrong...", [
                {text: "Sorry!", style: 'cancel'}
            ])
            return 
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        const newRandNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRandNumber)
        setGuessRounds(prevGuessRounds => [newRandNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <Text  style={styles.instructionText}>Higher or lower?</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color="white" />
                </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                <Ionicons name='md-add' size={24} color="white" />
                </PrimaryButton>
                </View>
            </View>
        </Card>
        <View>
            <View>
                {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
                <FlatList 
                   data={guessRounds}
                   renderItem={(itemData) => (
                      <GuessLogItem 
                        roundNumber={guessRoundsListLength - itemData.index} 
                        guess={itemData.item}
                      />
                   )}
                   keyExtractor={(item) => item}
                />
            </View>
        </View>
    </View>
}
export default GameScreen

const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily: 'open-sans'
    },
    screen: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ddb52f',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#ddb52f',
        padding: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        padding: 20
    },
    buttonContainer: {
        flex: 1
    }
})