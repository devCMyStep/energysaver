from tkinter import *
import paho.mqtt.publish as publish
import time
import datetime
import random
import json

master = Tk()
master.title("PyMCS")
master.geometry("230x445")
def start():
	global model
	user = userEnt.get()
	local = localEnt.get()
	dispositivo = dispEnt.get()
	iteracoes = int(iteEnt.get())
	topico = topEnt.get()
	host = hosEnt.get()
	intervalo = float(intEnt.get())
	tipo_sensor =TipsenEnt.get()
	modelo_sensor = ModsenEnt.get()
	tempo_i = 0    
	tempo_f = iteracoes
	dado = dadEnt.get()
	dado = dado.split(",")
	while tempo_i < tempo_f :
		valor = random.uniform(float(dado[0]),float(dado[1]))
		dia = str(datetime.date.today())
		#dia =  "2017-07-18"
		hora = str(datetime.datetime.now().time()).split(".")
		hora = str(hora[0])
		#hora = "15:38:52"
		model = {
				"user": user,
				"local": local,
				"device":dispositivo,
				"day": dia,
				"hour": hora,
				"tipo_sensor": tipo_sensor,
				"modelo_sensor": modelo_sensor,
				"value": valor
				}
		publish.single(topic=topico, payload=json.dumps(model), hostname=host)
		print("%s \n"%(json.dumps(model)))
		time.sleep(intervalo)
		tempo_i += 1

#############################
#  Configs do dispositivo
confLab = Label(master, text="Configurações Gerais")
confLab["fg"] = "blue"
confLab.pack()
#  USER
userLab = Label(master, text="User: ")
userLab.pack()

userEnt = Entry(master)
userEnt.insert(0,"dalton") #  valor padrao, segue para todos 
userEnt.pack()
#  LOCAL
localLab = Label(master, text='Local: ')
localLab.pack()

localEnt = Entry(master)
localEnt.insert(0,"labic")
localEnt.pack()
#  DISPOSITIVO
dispLab = Label(master, text="Dispositivo: ")
dispLab.pack()

dispEnt = Entry(master)
dispEnt.insert(0, "simulacao python")
dispEnt.pack()
#  TIPO DO SENSOR
TipsenLab = Label(master, text="Tipo do sensor: ")
TipsenLab.pack()

TipsenEnt = Entry(master)
TipsenEnt.insert(0,"corrente")
TipsenEnt.pack()
#  MODELO DO SENSOR
ModsenLab = Label(master, text="Modelo do sensor: ")
ModsenLab.pack()

ModsenEnt = Entry(master)
ModsenEnt.insert(0,"ACS712")
ModsenEnt.pack()
#  DADOS
dadLab = Label(master, text="Leitura (aleatorio entre):")
dadLab.pack()

dadEnt = Entry(master)
dadEnt.insert(0, "0.4,0.6")
dadEnt.pack()
#  ITERAÇÕES
iteLab = Label(master, text="Nº de Iterações: ")
iteLab.pack()

iteEnt = Entry(master)
iteEnt.insert(0, "15")
iteEnt.pack()
#  INTERVALO 
intLab = Label(master, text="Intervalo entre leituras: ")
intLab.pack()

intEnt = Entry(master)
intEnt.insert(0, "1")
intEnt.pack()
#  MQTT configs
mqttLab = Label(master, text="Configurações MQTT")
mqttLab['fg'] = "green"
mqttLab.pack()
#  TOPICO
topLab = Label(master, text="Topico: ")
topLab.pack()

topEnt = Entry(master)
topEnt.insert(0, "Tapajos-IoT")
topEnt.pack()
#  HOST
hosLab = Label(master, text="Host: ")
hosLab.pack()

hosEnt = Entry(master)
hosEnt.insert(0, "localhost")
hosEnt.pack()
#  Botao Ok
OkBut = Button(master, text="OK", command=start)
OkBut.pack()

master.mainloop()