from flask import Blueprint, request, jsonify, render_template
from app_server.controllers.signalController import bandpass_filter, extract_features
from app_server.controllers.analysisController import generate_chart
from app_server.models.mlModel import load_model

model = load_model('ml_scripts/bci_model.pkl')

routes = Blueprint('routes', __name__)

@routes.route('/')
def home():
    return render_template('home.jade')

@routes.route('/games')
def games():
    return render_template('game.jade')

@routes.route('/process_signal', methods=['POST'])
def process_signal():
    try:
        data = request.json.get('signal', [])
        filtered_signal = bandpass_filter(data, 0.5, 30, 128)
        features = extract_features(filtered_signal)
        prediction = model.predict([features])

        actions = {0: "jump", 1: "move_forward", 2: "pause"}
        game_action = actions.get(prediction[0], "no_action")

        return jsonify({"action": game_action, "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False})

@routes.route('/analysis', methods=['POST'])
def analysis():
    try:
        data = request.json.get('data', [])
        chart_type = request.json.get('type', 'line')
        labels = request.json.get('labels', [])
        title = request.json.get('title', 'Analysis Chart')

        chart_img = generate_chart(data, chart_type, labels, title)
        return jsonify({"chart": chart_img, "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False})
