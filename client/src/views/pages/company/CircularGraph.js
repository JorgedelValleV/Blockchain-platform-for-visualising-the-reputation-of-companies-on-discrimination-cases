import React from 'react'


import {
    PieChart,
    Pie,
    Legend,
    Cell,
    Tooltip
} from 'recharts'
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };      


export default function CircularGraph({ data, colores , ancho, alto, tipo}) {

  //LOS DATOS QUE SE LLEGAN SON DE LA FORMA [{ "category" : .... , "value" : x}]
  let fixedData = []
  for(let d of data){
    fixedData.push({
      "name" : d.category.charAt(0).toUpperCase() + d.category.slice(1),
      "value": d.value
    })
  }

  return (
  
    <PieChart width={ancho} height={alto}>
    <Pie
        data={fixedData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#5dade2"
        dataKey="value"
      >
        {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colores[index % colores.length]}
                        />
                    ))}
      </Pie>
      <Legend align="left" verticalAlign="middle" width="33.3%" />
      <Tooltip />
    </PieChart>
  );
}