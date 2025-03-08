import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stethoscope, Pill as Pills, Search, Shield, Brain, Heart } from 'lucide-react-native';

export default function SymptomScreen() {
  const insets = useSafeAreaInsets();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<null | {
    suggestedMedicines: Array<{
      name: string;
      dosage: string;
      warning?: string;
    }>;
    advice: string;
  }>(null);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    // TODO: Integrate with medical LLM API
    // For now, using mock data
    setTimeout(() => {
      setAnalysis({
        suggestedMedicines: [
          {
            name: 'Paracetamol',
            dosage: '500mg twice daily',
            warning: 'Take after food',
          },
          {
            name: 'Ibuprofen',
            dosage: '400mg as needed',
            warning: 'Not recommended for stomach ulcer patients',
          },
        ],
        advice: 'Please ensure to rest well and stay hydrated. If symptoms persist for more than 3 days, consult a healthcare professional.',
      });
      setLoading(false);
    }, 2000);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced medical AI analyzes your symptoms for accurate medicine suggestions',
    },
    {
      icon: Shield,
      title: 'Safe & Reliable',
      description: 'All suggestions are based on verified medical databases and guidelines',
    },
    {
      icon: Search,
      title: 'Comprehensive Database',
      description: 'Access information about thousands of medicines and their uses',
    },
    {
      icon: Pills,
      title: 'Detailed Information',
      description: 'Get complete details including dosage, warnings, and precautions',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}>
      
      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <View style={styles.brandContainer}>
          <View style={styles.logoContainer}>
            <Heart size={32} color="#007AFF" weight="fill" />
            <Text style={styles.brandName}>MediGuide</Text>
          </View>
          <Text style={styles.brandTagline}>Your Trusted Health Companion</Text>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Smart Health Decisions Start Here</Text>
          <Text style={styles.heroSubtitle}>Get personalized medicine suggestions powered by advanced AI technology</Text>
        </View>
      </View>

      {/* Symptom Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Describe your symptoms</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="E.g., I have a headache and mild fever since yesterday..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={[styles.button, !symptoms.trim() && styles.buttonDisabled]}
          onPress={analyzeSymptoms}
          disabled={!symptoms.trim() || loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Analyze Symptoms</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Why Choose MediGuide?</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <feature.icon size={32} color="#007AFF" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Analysis Results */}
      {analysis && (
        <View style={styles.analysisContainer}>
          <Text style={styles.sectionTitle}>Suggested Medicines</Text>
          {analysis.suggestedMedicines.map((medicine, index) => (
            <View key={index} style={styles.medicineCard}>
              <Text style={styles.medicineName}>{medicine.name}</Text>
              <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
              {medicine.warning && (
                <Text style={styles.warning}>{medicine.warning}</Text>
              )}
            </View>
          ))}

          <Text style={styles.sectionTitle}>Medical Advice</Text>
          <View style={styles.adviceCard}>
            <Text style={styles.adviceText}>{analysis.advice}</Text>
          </View>
        </View>
      )}

      {/* Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerText}>
          ⚠️ This app is for informational purposes only and should not replace professional medical advice. Always consult a healthcare provider for medical decisions.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  brandHeader: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  brandContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginLeft: 8,
  },
  brandTagline: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  heroSection: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 24,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresContainer: {
    marginTop: 32,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    width: Platform.select({
      web: 'calc(50% - 16px)',
      default: '100%',
    }),
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  analysisContainer: {
    marginTop: 24,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  medicineCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  medicineDosage: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  warning: {
    fontSize: 14,
    color: '#ff3b30',
    marginTop: 8,
  },
  adviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adviceText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  disclaimerContainer: {
    marginTop: 32,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
      },
    }),
  },
  disclaimerText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    lineHeight: 20,
  },
});