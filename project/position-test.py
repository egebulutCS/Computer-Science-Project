lst = "[[[341, 902], [501, 860], [417, 870], [504, 856], [417, 875], [505, 864], [412, 870], [504, 856], [416, 866], [503, 856], [419, 867], [501, 846]], [[371, 907], [501, 849], [413, 858], [501, 847], [417, 858], [503, 854], [416, 866], [502, 854], [415, 865], [507, 851], [414, 860], [501, 847]], [[351, 907], [503, 873], [414, 877], [503, 868], [417, 874], [502, 857], [417, 871], [500, 864], [413, 878], [502, 871], [412, 881], [501, 873]], [[374, 908], [503, 853], [417, 868], [504, 867], [415, 876], [503, 861], [419, 869], [500, 855], [415, 865], [503, 861], [415, 872], [500, 863]], [[356, 908], [505, 852], [413, 866], [500, 859], [417, 868], [503, 859], [415, 867], [500, 858], [411, 874], [500, 863], [412, 874], [501, 869]]]"

res = lst[2:-2].split('], ')

res = [x + "]" for x in res]

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
    
print(minmax)

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

print(averages)