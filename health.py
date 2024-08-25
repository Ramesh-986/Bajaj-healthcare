from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'POST':
        data = request.json.get('data', [])
        user_id = "john_doe_17091999"  # replace with actual user details
        email = "john@xyz.com"
        roll_number = "ABCD123"

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lowercase_alphabets = [item for item in alphabets if item.islower()]
        highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }
        return jsonify(response)

    elif request.method == 'GET':
        return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
