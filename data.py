# -*- coding: utf-8 -*-
"""

@author: egebulut
"""

import ast
import xlrd
import xlsxwriter

def load(file):
    df = []
    xl = xlrd.open_workbook(file)
    xl = xl.sheet_by_name('Worksheet')
    for rownum in range(1,xl.nrows):
        x0 = xl.cell(rownum,0).value
        x1 = xl.cell(rownum,1).value
        x2 = xl.cell(rownum,2).value
        x3 = xl.cell(rownum,3).value
        x4 = xl.cell(rownum,4).value
        df.append([x0,x1,x2,x3,x4])
    return df

def save(file,dataDict):
    workbook = xlsxwriter.Workbook(file)
    worksheet = workbook.add_worksheet()
    
    row = 0
    col = 0
    
    for x in dataDict:
        row += 1
        worksheet.write(row, col, x[0])
        worksheet.write(row, col+1, x[1])
        worksheet.write(row, col+2, x[2])
        worksheet.write(row, col+3, str(x[3]))
        worksheet.write(row, col+4, str(x[4]))

    workbook.close()
    
def timeCalc(lst):
    df = []
    lst = ast.literal_eval(lst)
    for i in range(0, len(lst)-1):
        df.append(lst[i+1]-lst[i])
    return df

def extractTime(lst):
    df = []
    res = lst[1:-1].split('], ')
    res = [x + "]" for x in res]
    res[len(res)-1] = res[len(res)-1][:-1]
    for x in res:
        df.append(timeCalc(x))
    return df

def normalize(dataArray):
    df = []
    for x in dataArray:
        df.append([x[0],x[1],x[2],extractTime(x[3]),normalizePos(x[4])])
    return df

def normalizePos(lst):
    res = lst[2:-2].split('], ')

    res = [x + "]" for x in res]
    res[len(res)-1] = res[len(res)-1][:-1]

    result = []
    temp = []
    for i in res:
        if i[1] == '[':
            result.append(temp)
            temp = []
            x = [int(i[2:5]), int(i[7:10])]
            temp.append(x)
        else:
            x = [int(i[1:4]), int(i[6:9])]
            temp.append(x)
    result.append(temp)

    return result

def minmaxPos(result):
    x = []
    y = []
    for i in result:
        tempx = []
        tempy = []
        for j in i:
            tempx.append(j[0])
            tempy.append(j[1])
            x.append(tempx)
            y.append(tempy)

    xs = []
    ys = []
    for i in range(0,len(x[0])):
        tempx = []
        tempy = []
        for k in x:
            tempx.append(k[i])
        for l in y:
            tempy.append(l[i])
        xs.append(tempx)
        ys.append(tempy)

    xminmax = []
    yminmax = []
    for i in range(0,len(xs)):
        xminmax.append([min(xs[i]),max(xs[i])])
        yminmax.append([min(ys[i]),max(ys[i])])

    minmax = []
    for i in range(0,len(xminmax)):
        minmax.append([xminmax[i],yminmax[i]])
    return minmax;

def minmaxTime(lst):
    result = []
    for i in range(0,len(lst[0])):
        temp = []
        for k in lst:
            temp.append(k[i])
        result.append(temp)
    minmax = []
    for i in result:
        minmax.append([min(i),max(i)])
    return minmax

def getMinMax(lst):
    df = []
    for x in lst:
        df.append([x[0],x[1],x[2],minmaxTime(x[3]),minmaxPos(x[4])])
    return df

def getAvg(lst):
    df = []
    for x in lst:
        df.append([x[0],x[1],x[2],avgTime(x[3]),avgPos(x[4])])
    return df

def avgTime(lst):
    result = []
    for i in range(0,len(lst[0])):
        temp = []
        for k in lst:
            temp.append(k[i])
        result.append(temp)
        
    avg = []
    for i in result:
        total = 0
        for j in i:
            total += j
        avg.append(total/len(i))
    return avg

def avgPos(result):
    x = []
    y = []
    for i in result:
        tempx = []
        tempy = []
        for j in i:
            tempx.append(j[0])
            tempy.append(j[1])
        x.append(tempx)
        y.append(tempy)

    xs = []
    ys = []
    for i in range(0,len(x[0])):
        tempx = []
        tempy = []
        for k in x:
            tempx.append(k[i])
        for l in y:
            tempy.append(l[i])
        xs.append(tempx)
        ys.append(tempy)
                
    xavg = []
    yavg = []
    for i in range(0,len(xs)):
        xtotal = 0
        for k in xs[i]:
            xtotal += k
        xavg.append(xtotal/len(xs))
        ytotal = 0
        for j in ys[i]:
            ytotal += j
        yavg.append(ytotal/len(ys))
            
    averages = []
    for i in range(0,len(xavg)):
        averages.append([xavg[i],yavg[i]])  
    return averages

df = load("csproject.xlsx")
df = normalize(df)
#print("ID: ", df[0][0]) 
#print("UserID: ", df[0][1])
#print("Combination: ", df[0][2])
#print("Time: ", df[0][3])
#print("Position: ", df[0][4]) # [0]: index of data (limit 83) [4]: column data (limit 5)
save("data.xlsx",df)

MinMaxdf = getMinMax(df)
save("minmax.xlsx",MinMaxdf)

Avgdf = getAvg(df)
save("avg.xlsx",Avgdf)