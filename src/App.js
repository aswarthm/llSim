import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


class node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
    this.addr = Math.floor(1000 + Math.random() * 9000);
  }
}

function Node({ value, addr, color }) {
  return (
    <>
      <div className={`node ${color}`}>
        <div className="data">{value}</div>
        <div className="addr">{addr}</div>
      </div>
    </>
  );
}

function Arrow() {
  return <div className="arrow"><FontAwesomeIcon icon={solid('arrow-right-long')} size={"2x"} /></div>;
}

function App() {
  var bo = new node(5);
  bo.next = new node(9);

  const [linkedList, setLinkedList] = useState([]);
  const [nodeValue, setNodeValue] = useState();
  const [start, setStart] = useState();
  const [inputData, setInputData] = useState([1, 2]);
  const [pointers, setPointers] = useState({});
  const dataRef = useRef();

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    setLinkedList([]);
    parseLL(start);
  }, [start]);

  useEffect(() => {
    setLinkedList([...linkedList, nodeValue]);
  }, [nodeValue]);

  useEffect(() => {
    setLinkedList([]);
    parseLL2(start);
  }, [pointers]);

  function handleData() {
    if (inputData !== "") {
      let nodeList = inputData.map((value) => {
        return new node(value);
      });
      for (let start = 0; start < nodeList.length; start++) {
        if (start !== nodeList.length - 1) {
          nodeList[start].next = nodeList[start + 1];
        }
      }
      nodeList[nodeList.length - 1].next = null;
      setStart(nodeList[0]);
      setInputData("");
    }
  }

  async function parseLL(temp) {
    while (temp != null) {
      var nodeValue = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            <>
              <Node
                value={temp.data}
                addr={temp.addr}
                color={
                  temp === pointers.current
                    ? "current"
                    : temp === pointers.post
                    ? "post"
                    : ""
                }
              />
              {temp.next !== null ? <Arrow /> : ""}
            </>
          );
        }, 200);
      });
      setNodeValue(nodeValue);
      temp = temp.next;
    }
  }

  function parseLL2(temp) {
    var result = [];
    while (temp != null) {
      var nodeValue = (
        <>
          <Node
            value={temp.data}
                addr={temp.addr}
            color={
              temp === pointers.current
                ? "current"
                : temp === pointers.post
                ? "post"
                : ""
            }
          />
          {temp.next !== null ? <Arrow /> : ""}
        </>
      );
      result.push(nodeValue);
      temp = temp.next;
    }
    setLinkedList(result);
  }

  async function addNode() {
    var current = null;
    var post = start;
    setPointers({ current, post });
    while (post != null) {
      var pointers = await new Promise((resolve) => {
        setTimeout(() => {
          current = post;
          post = current.next;
          resolve({ current, post });
        }, 1000);
      });
      setPointers(pointers);
    }
    var newNode = new node(dataRef.current.value);
    current.next = newNode;
    var nodeValue = (
      <>
        <Node
          value={newNode.data}
          addr={0}
          color={
            newNode === pointers.current
              ? "current"
              : newNode === pointers.post
              ? "post"
              : ""
          }
        />
        {newNode.next !== null ? <Arrow /> : ""}
      </>
    );
    await new Promise((res) => setTimeout(res, 1000));
    setNodeValue(nodeValue);
    setPointers({});
  }

  return (
    <>
      <div className="inputContainer">
        <input
          className="dataInput"
          type="number"
          defaultValue="0"
          ref={dataRef}
        />
        <div className="add" role="button" onClick={() => addNode()}>
          Add
        </div>
      </div>
      <div className="linkedList">
        {linkedList && linkedList.map((node) => node)}
      </div>
    </>
  );
}

export default App;
