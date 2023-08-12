import os
# 2:
# import smtplib
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from flask_mail import Mail, Message

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# 1:
# app.config["MAIL_DEFAULT_SENDER"] = "hassanqari9@gmail.com"
# app.config["MAIL_PASSWORD"] = "iamhassan"
# app.config["MAIL_PORT"] = 587
# app.config["MAIL_SERVER"] = "smtp.gmail.com"
# app.config["MAIL_USE-TLS"] = True
# app.config["MAIL_USERNAME"] = "Hasaan Qari"
# mail = Mail(app)

@app.route("/")
def index():
    if not session.get("name"):
        return redirect("/login")
    return render_template("index.html")

@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "POST":
        session["name"] = request.form.get("name")

        # 1:
        # email = request.form.get("email")
        # message = "Thank u for logging in"
        # server = smtplib.SMTP("smtp.gmail.com", 587)
        # server.starttls()
        # server.login("hassanqari9@gmail.com", "")
        # server.sendmail("hassanqari9@gmail.com", email, message)

        # 2:
        # email = request.form.get("email")
        # message = Message("thank u for ur loging in", recipients=[email])
        # mail.send(message)

        return redirect("/")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session["name"] = None
    return redirect("/")

@app.route("/news1")
def news1():
    return render_template("news1.html")

@app.route("/news2", methods=["GET","POST"])
def news2():
    if request.method == "POST":
        Search = request.form.get("Search")
        return redirect("/news1")
    return render_template("news2.html")
    

@app.route("/contact", methods=["GET","POST"])
def contact():
    if request.method == "POST":

        # email = request.form.get("email")
        # message = Message("thank u for ur feedback", recipients=[email])
        # mail.send(message)
        return redirect("/contact2")

    return render_template("contact.html")

@app.route("/contact2")
def contact2():
    return render_template("contact2.html")
