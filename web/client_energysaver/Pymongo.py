import paho.mqtt.publish as publish
from pymongo import MongoClient
from pprint import pprint
from datetime import date
import time
import datetime
import random
#AREA MONGODB cliente e portas
# cliente = MongoClient('localhost', 27017)
# dbdados = cliente.dbdata  # -->  banco de dados
# dados = dbdados.dados  # -->   colecao de dados
# values = dados.find_one()

#user-configs
user = "Dalton Felipe"
local = "Labic"
dispositivo = "simulacao python"
sensores = "1-Temperatura, 2-Humidade"

tempo_i = 0    
tempo_f = 90

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
	#dados.insert_one(model)
	publish.single("Tapajos-IoT", value, hostname="localhost")
	pprint(model)
	time.sleep(1)
	tempo_i += 1
