def calculate_bmr(gender, weight, height, age):
    if gender == "male":
        return 10 * weight + 6.25 * height - 5 * age + 5
    else:
        return 10 * weight + 6.25 * height - 5 * age - 161

def adjust_calories(bmr, activity_level):
    factors = {
        "light": 1.375,
        "moderate": 1.55,
        "heavy": 1.725
    }
    return bmr * factors.get(activity_level, 1.55)

def target_calories(maintenance, goal):
    if goal == "gain":
        return maintenance + 300
    elif goal == "lose":
        return maintenance - 500
    return maintenance
