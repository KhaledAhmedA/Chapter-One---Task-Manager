import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface Props {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={onToggle} style={styles.taskTextContainer}>
                <Ionicons
                    name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={task.completed ? '#28a745' : '#999'}
                />
                <Text style={[styles.taskText, task.completed && styles.completedText]}>
                    {task.text}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
                <Ionicons name="trash-outline" size={24} color="#ff3b30" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    taskTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    taskText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
});

export default TaskItem;
