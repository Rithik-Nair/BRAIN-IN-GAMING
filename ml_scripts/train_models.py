import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris  # Example dataset
from sklearn.model_selection import train_test_split

# Load a sample dataset for demonstration (Iris dataset)
data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2)

# Train RandomForestClassifier
rfc = RandomForestClassifier(n_estimators=100, random_state=42)
rfc.fit(X_train, y_train)
joblib.dump(rfc, 'ml_scripts/rfc_model.pkl')  # Save the model to a file

# Train SVM (Support Vector Machine)
svm = SVC(kernel='linear')  # You can change kernel type based on your requirements
svm.fit(X_train, y_train)
joblib.dump(svm, 'ml_scripts/svm_model.pkl')  # Save the model to a file

# Train KNN (K-Nearest Neighbors)
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
joblib.dump(knn, 'ml_scripts/knn_model.pkl')  # Save the model to a file

print("Models trained and saved successfully.")
