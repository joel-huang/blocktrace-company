import string
import random
import os
import psycopg2
import json

def generate_random_string():
  length = random.randint(5,10)
  output = ""
  characters = string.ascii_lowercase
  for i in range(length):
    output += random.choice(characters)
  return output

def connect_db():
    os.environ['DATABASE_URL'] = "postgres://kulppdlibhsggy:4655032868ea8a3c938e2bd5d015130b41c7810d012e8edc3518de8490bf205d@ec2-54-83-23-91.compute-1.amazonaws.com:5432/db5s1h8iuhepc"
    conn = psycopg2.connect(os.environ['DATABASE_URL'], sslmode = 'require')
    cur = conn.cursor()
    return conn, cur

def makenew(num):
    conn,cur = connect_db()
    for i in range(1, num):
        username = generate_random_string()
        password = "pw"
        user_info = {"name":generate_random_string(),"birthdate":"23/04/2000","postcode":"485999","encrypted_id":"S1030456F"}
        cur.execute("INSERT INTO COMPANY_DATABASE (USERNAME,PASSWORD,USER_INFO) \
                        VALUES (%s,%s,%s)",(username,password,json.dumps(user_info)))
        conn.commit()
        print("Done " + str(i))

def del_user(username):
    conn,cur = connect_db()
    print("checking for user " + str(username))
    # cur.execute("DELETE from COMPANY_DATABASE where USERNAME = '%s' + "%username)
    cur.execute("DELETE from COMPANY_DATABASE)")
    conn.commit()
    conn.close()
    return "Deleted user %s"%username

def del_all():
    conn,cur = connect_db()
    cur.execute("DELETE FROM COMPANY_DATABASE")
    conn.commit()
    return "Deleted everything"

#select database
def select_db(column,database):
    conn,cur = connect_db()
    cur.execute("SELECT %s FROM %s"%(column,database))
    rows = cur.fetchall()
    return conn,cur,rows

def add_company_staff(user, pw):
    conn,cur,rows = select_db("*","COMPANY_LOGIN")
    print(rows)
    cur.execute("INSERT INTO COMPANY_LOGIN (USERNAME,PASSWORD,LOGGED_IN) \
                        VALUES (%s,%s,%s)",(user,pw,"false"));
    conn.commit()
    

    # response.headers['Access-Control-Allow-Origin'] = '*'
    # print(response)

def print_company_staff():
    conn,cur,rows = select_db("*","COMPANY_LOGIN")
    return rows

x= print_company_staff()
print(x)