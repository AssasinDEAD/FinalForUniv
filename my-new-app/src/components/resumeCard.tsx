import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Определяем интерфейс для резюме
interface Resume {
  additionalInfo: string;
  skills: any[];
  experience: any[];
}

const ResumeCard = ({ resume }: { resume: Resume | null }) => {
  const navigation = useNavigation<any>(); // Параметры навигации должны быть типизированы

  // Проверяем, если резюме отсутствует, отображаем сообщение
  if (!resume) {
    return <Text>Резюме не найдено</Text>;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ResumeDetails', { resumeId: resume.additionalInfo })}
    >
      <Text style={styles.title}>{resume.additionalInfo || 'Без названия'}</Text>
      <Text>Навыки: {resume.skills.length}</Text>
      <Text>Опыт: {resume.experience.length}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ResumeCard;
