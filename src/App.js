import React from 'react';
import './App.css';


class node{
  constructor(data){
    this.data = data
    this.next = null
    this.prev = null
  }
}

function App() {
  var bo = new node(5)
  bo.next = new node(9)

  const [root, setRoot] = React.useState([bo])
  const dataRef = React.useRef()
  console.log(root)
  var value = 4



  function addNode({root}){
    const newRoot = root
    var [temp] = newRoot
    while(temp.next){
      temp=temp.next
    }
    console.log(dataRef.current.value)
    temp.next = new node(dataRef.current.value)
    setRoot([...newRoot])
    console.log(newRoot)
  }

  return (
    <>
      <div className="container">
        <List root={root}/>
      </div>
      <input className="dataInput" type="number" defaultValue="0" ref={dataRef} />
      <div className="add" role="button" onClick={() => addNode({root})}>Add</div>
    </>
  );
}

function Node({data, arrow}){
  console.log(data)
  return(
    <div>
      {data}
      {arrow?" ->":""}
    </div>
  )
}


const List = ({ root }) => {
  
  function getNodes({root}){
    var nodes = [];
    var [temp] = root
    while(temp.next){
      nodes.push(<Node data={temp.data} arrow={true}/>)
      temp = temp.next
    }
    nodes.push(<Node data={temp.data} arrow={false}/>)
    console.log(nodes)
    return(nodes.map((data, i) => {
      console.log(data)
      return(
        <div className="node">{data}</div>
      )
    }))
  }

  return(
      getNodes({root})
  )
}


export default App;
