import numpy as np
from scipy.signal import butter, lfilter

def bandpass_filter(data, lowcut, highcut, fs, order=4):
    nyquist = 0.5 * fs
    low = lowcut / nyquist
    high = highcut / nyquist
    b, a = butter(order, [low, high], btype='band')
    return lfilter(b, a, data)

def extract_features(signal):
    features = {
        "mean": np.mean(signal),
        "std_dev": np.std(signal),
        "max": np.max(signal),
        "min": np.min(signal),
        "energy": np.sum(signal ** 2),
    }
    return np.array(list(features.values()))
