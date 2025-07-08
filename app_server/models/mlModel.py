import joblib

def load_model(model_path):
    try:
        model = load_model('ml_scripts/model_training.py')
        return model
    except Exception as e:
        raise ValueError(f"Error loading model: {e}")
