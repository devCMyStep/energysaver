from tkinter import *
import paho.mqtt.publish as publish
from pymongo import MongoClient
from pprint import pprint
from datetime import date
import time
import datetime
import random

master = Tk()

def start():
	global model
	user = userEnt.get()
	local = localEnt.get()
	dispositivo = dispEnt.get()
	iteracoes = int(iteEnt.get())
	topico = topEnt.get()
	host = hosEnt.get()
	intervalo = int(intEnt.get())
	sensores = "1-Temperatura, 2-Humidade"

	tempo_i = 0    
	tempo_f = iteracoes

	while tempo_i < tempo_f :
		temperatura = random.randint(20,23)
		humidade = random.randint(40,50)
		dia = str(datetime.date.today())
		hora = str(datetime.datetime.now().time()).split(".")
		hora = str(hora[0])
		model = {
			"user": user,
			"local": local,
			"day": dia,
			"hour": hora,
			"sensores": sensores,
			"temperature": temperatura,
			"humidity": humidade
		}

		value = '{"user": "%s","local": "%s","day": "%s","hour": "%s","sensores": "%s","temperature": "%s","humidity": "%s"}'%(str(user),str(local),str(dia),str(hora),str(sensores),str(temperatura),str(humidade))
		publish.single(topico, value, hostname=host)
		print("%s \n"%value)
		time.sleep(1)
		tempo_i += 1



#user-configs
master.geometry("230x400")

#############################
#  USER
userLab = Label(master, text="User: ")
userLab.pack()

userEnt = Entry(master)
userEnt.pack()
#  LOCAL
localLab = Label(master, text='Local: ')
localLab.pack()

localEnt = Entry(master)
localEnt.pack()
#  DISPOSITIVO
dispLab = Label(master, text="Dispositivo: ")
dispLab.pack()

dispEnt = Entry(master)
dispEnt.pack()
#  ITERAÇÕES
iteLab = Label(master, text="Nº de Iterações: ")
iteLab['fg'] = "blue"
iteLab.pack()

iteEnt = Entry(master)
iteEnt.pack()
#  INTERVALO 
intLab = Label(master, text="Intervalo entre leituras: ")
intLab['fg'] = "red"
intLab.pack()

intEnt = Entry(master)
intEnt.pack()
#  MQTT configs
mqttLab = Label(master, text="Configurações MQTT")
mqttLab['fg'] = "green"
mqttLab.pack()
#  TOPICO
topLab = Label(master, text="Topico: ")
topLab.pack()

topEnt = Entry(master)
topEnt.pack()
#  HOST
hosLab = Label(master, text="Host: ")
hosLab.pack()

hosEnt = Entry(master)
hosEnt.pack()
#  Botao Ok
OkBut = Button(master, text="OK", command=start)
OkBut.pack()



master.mainloop()

