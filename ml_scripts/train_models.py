import os
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Paths
DATA_PATH = "ml_scripts/emotions.csv"
MODEL_DIR = "ml_scripts/models"

# Create model directory if not exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Load the EEG emotions dataset
try:
    df = pd.read_csv(DATA_PATH)
    
    # Drop unnecessary columns if any (optional: remove 'id' if present)
    if 'id' in df.columns:
        df = df.drop('id', axis=1)
    
    # Separate features and labels
    X = df.drop('label', axis=1)
    y = df['label']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
except Exception as e:
    print("❌ Error loading dataset:", e)
    exit()

# Train RandomForest
rfc = RandomForestClassifier(n_estimators=100, random_state=42)
rfc.fit(X_train, y_train)
joblib.dump(rfc, os.path.join(MODEL_DIR, "rfc_model.pkl"))
rfc_acc = accuracy_score(y_test, rfc.predict(X_test))

# Train SVM
svm = SVC(kernel="linear")
svm.fit(X_train, y_train)
joblib.dump(svm, os.path.join(MODEL_DIR, "svm_model.pkl"))
svm_acc = accuracy_score(y_test, svm.predict(X_test))

# Train KNN
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
joblib.dump(knn, os.path.join(MODEL_DIR, "knn_model.pkl"))
knn_acc = accuracy_score(y_test, knn.predict(X_test))

# Output results
print("\n✅ Models trained and saved in 'ml_scripts/models/'")
print(f"📊 Random Forest Accuracy: {rfc_acc:.2f}")
print(f"📊 SVM Accuracy: {svm_acc:.2f}")
print(f"📊 KNN Accuracy: {knn_acc:.2f}")
