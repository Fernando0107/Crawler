from pygments.lexers import JavascriptLexer
from pygments import lex
from pygments.token import Token
from pygments.token import String, string_to_tokentype

lexer = JavascriptLexer()

#File
filepath = 't.js'

#File open 
fp = open(filepath) 
lines = fp.readlines()

#Code insertion
tokens = lex(fp, lexer)
code = []
for x in tokens:
    code.append(x)

def menu():
        print('\n--------- Crawler JS ---------\n')
        print('Press (1,2,3,4,5,6,7,8) to choose\n')
        print('1. Functions\n2. Variables \n3. Reserved Keywords\n4. Builtin \n5. Operators \n6. Constants \n7. Literals \n8. Full Lexer File ')
        x = input("> ")

        if x == '1':
                keyword()
        elif x== '2':
                variable()
        elif x == '3':
                other()
        elif x=='4':
                builtin()
        elif x=='5':
                operators()
        elif x=='6':
                constant()
        elif x == '7':
                literal()
        elif x == '8':
                Lexerfile()
        else: 
                print("Error, please enter a valid number. \n")
                menu()

def Lexerfile():
        print("------------------------------------ CoffeeScriptLexer -------------------------------\n")
        print(list(CoffeeScriptLexer().get_tokens(code)))
        print("\n-----------------------------------------------------------\n")
        print(list(CoffeeScriptLexer().get_tokens_unprocessed(code[:5])))

#------------------------------------ CoffeeScriptLexer // Por atributo ----------------------------------------------------

#Imprimir el atibuto según el Token
lista = list(CoffeeScriptLexer().get_tokens(code))

def keyword():
        print('\n ------------------- Definición de palabras reservadas --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Keyword'): #El atributo por el cual queremos buscar
                        print(i)
        print("\n")

def variable():

        print('\n ------------------- Variables --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Name.Variable'):
                        print(i)
        print("\n")

def other():
        print('\n ------------------- Otras palabras reservadas --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Name.Other'):
                        print(i)
        print("\n")


def builtin():
        print('\n ------------------- Builtin --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Name.Builtin'):
                        print(i)
        print("\n")


def operators():
        print('\n ------------------- Operadores --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Operator'):
                        print(i)
        print("\n")


def constant():
        print('\n ------------------- Constantes --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Keyword.Constant'):
                        print(i)
        print("\n")


def literal():
        print('\n ------------------- Literales --------------------\n')
        for i in lista:
                if i[0] == string_to_tokentype('Token.Literal.String'):
                        print(i)
        print("\n")


    


menu()





#print(code)
#formatter = HtmlFormatter(full=True, linenos=True)


#print("------------------------------------ JavascriptLexer -------------------------------\n")
#print(list(JavascriptLexer().get_tokens(code)))
#print("-------------------------------- TypeScriptLexer -----------------------------------\n")
#print(list(TypeScriptLexer().get_tokens(code)))
#print("---------------------------------- ObjectiveJLexer ---------------------------------\n")
#print(list(ObjectiveJLexer().get_tokens(code)))

#file2 = open("save.html", "w")

#file2.write(code)

#http://pygments.org/docs/tokens/

