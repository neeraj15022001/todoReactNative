import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Text, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import Header from "./Components/Header";
import TodoItem from "./Components/TodoItem";
import AddTodo from "./Components/AddTodo";

export default function App() {
    const [todos, setTodos] = useState([
        {text: "buy coffee", key: "1"},
        {text: "create an app", key: "2"},
        {text: "play on the switch", key: "3"},
    ])
    const handleClick = (key) => {
        setTodos((prevState) => {
            return prevState.filter(todo => todo.key !== key);
        })
    }
    const handleAddTodo = (text) => {
        if (text.length > 3) {
            setTodos((prevState) => {
                return [{text: text, key: Math.random().toString()}, ...prevState];
            })
        } else {
            Alert.alert('Oops!', 'Todos must be over 3 characters long', [{
                text: "Understood",
                onPress: () => console.log("alert closed")
            }])
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header/>
                <View style={styles.content}>
                    <AddTodo handleClick={handleAddTodo}/>
                    <View style={styles.list}>
                        <FlatList data={todos} renderItem={({item}) => (
                            <TodoItem item={item} handler={handleClick}/>
                        )}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    content: {padding: 16, flex: 1},
    list: {marginTop: 0, flex: 1}
})
