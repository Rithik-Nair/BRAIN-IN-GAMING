import matplotlib.pyplot as plt
import io
import base64

def generate_chart(data, chart_type, labels=None, title=""):
    plt.figure(figsize=(8, 4))
    
    if chart_type == "line":
        plt.plot(data, label=title, color="blue")
    elif chart_type == "bar" and labels:
        plt.bar(labels, data, color="orange")
    else:
        raise ValueError("Invalid chart type or missing labels for bar chart.")
    
    plt.title(title)
    plt.grid()
    
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    return img_base64
