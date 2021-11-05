import React from 'react'
import Navigation from './navigation'
import { Rate, Card,List, Avatar, Space, Button, PageHeader } from 'antd';
import { useState } from 'react';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';



const Rating_Page = ({login,name,setCurrent,current}) => {

    //default value
    const navBar = (
        <header>
        <div><Navigation login={login} name={name} setCurrent={setCurrent} current={current}/></div>
        </header>
      )

    //variable
    // const appliersId = ['11','22','33']
    const appliersName = ["陳大大","林中中","黃小小","陳大中","林中小","黃小大","陳大大","林中中","黃小小","陳大大","林中中","黃小小"]
    const appliersGender = ['Male', 'Female', 'Male','Male', 'Female', 'Male','Male', 'Female', 'Male','Male', 'Female', 'Male']
    const appliersNumber = appliersName.length;

    //init everyone's rate to zero
    const tempArr = []
    for(var i = 0;i < appliersNumber;i++){
        tempArr.push({value: 0});
    }
    const [rate, setRate] = useState(tempArr)


    const handleStar = (id, inputValue) => {
      let newArr = [...rate]; // copying the old datas array
      newArr[id] = {value: inputValue};
      setRate(newArr);
    }

    //星星顯示 and 最後應該POST上去的數值
    let values = [];
    for(let i = 0;i < appliersNumber;i++){
      values.push(rate[i].value);
    }
    
    //testing
    const listData = [];
    for (let i = 0; i < appliersNumber; i++) {
      listData.push({
        title: appliersName[i],
        avatar: appliersGender[i] === 'Male' ? (<Icon icon="noto-v1:boy-light-skin-tone" color="#c9c9c9" height="20" />): (<Icon icon="noto:girl-light-skin-tone" color="#c9c9c9" height="20" />),
        description:
          (
            <div style={{display: 'inline-box'}}> 
              <Rate onChange={(value) => handleStar(i, value)} value={values[i]} />
            </div>
          )
      });
    }

      return(
          <div className="rating">
            {navBar}
            {/* 這邊再加一個 */}
            <PageHeader
            onBack={() => window.history.back()}
            subTitle="返回歷史紀錄"
            />
            <div className="rating_frame">
              <List
                className="rating_list"
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5,
                }}
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
                />
            </div>
            <Button className="cancel_button"><Link to="/">取消</Link></Button>
            <Button type="primary" className="send_button"><Link to="/">送出</Link></Button>


            </div>
    )


}

export default Rating_Page



