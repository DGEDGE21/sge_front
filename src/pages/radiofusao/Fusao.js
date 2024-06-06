import React, { useState } from 'react';
import { Input, Button, Table,message, Typography,Steps,Space,Segmented,Avatar,SegmentedProps } from 'antd';
import { SearchOutlined, BarsOutlined, AppstoreOutlined } from '@ant-design/icons';

import { fetchUserVehicles } from '../../api/Api'; 

function Fusao() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('AAA-123-PV');
  const [current, setCurrent] = useState(0);
  const [vehicles,setVehicles]=useState('');
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const description = '';

  const handleSearch = () => {
    if (validarMatricula(searchValue)) {
      fetchUserVehicles(searchValue)
        .then((data) => {
          console.log("User vehicles:", data);
          setVehicles(data)
          setCurrent(1)
          // Handle the data as needed
        })
        .catch((error) => {
          console.error("Error fetching user vehicles:", error);
          // Handle the error
        });
      console.log('Searching for:', searchValue);
    } else {
      message.error('Matrícula inválida. Por favor, insira uma matrícula válida.');
    }
  };
  const onChangepay: SegmentedProps["onChange"] = (value: string) => {
    console.log(value);
  };
  const totalPurchaseAmount = 1000; 
  const validarMatricula = (matricula) => {
    const padrao = selectedFormat === 'MMM-11-11' ? /^[A-M]{1}[A-Z]{2}-\d{2}-\d{2}$/ : /^[A-Z]{3}-\d{3}-[A-Z]{2}$/;
    return padrao.test(matricula);
  };
  const columns = [
    {
      title: 'Matrícula',
      dataIndex: 'matricula',
      key: 'matricula',
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },
    {
      title: 'Ano de Fabricação',
      dataIndex: 'ano_fabricacao',
      key: 'ano_fabricacao',
    },
   
   
    {
      title: 'Número do Chassi',
      dataIndex: 'numero_chassi',
      key: 'numero_chassi',
    },
    {
      title: 'Combustível',
      dataIndex: 'combustivel',
      key: 'combustivel',
    },
  
  ];
  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase(); // Converter para maiúsculas
    // Definir o max length com base na primeira letra digitada
    const maxLength = value.startsWith('M') ? 9 : 10;
    console.log(maxLength)
    if (maxLength === 9 ) {
        setSelectedFormat('MMM-11-11');
        if (value.length === 3 || value.length === 6) {
          value += '-';
        }
      }else{
        setSelectedFormat('AAA-123-PV')
        if (value.length === 3 || value.length === 7) {
          value += '-';
        }
      }
    
    // Adicionar o "-" automaticamente após inserir cada seção
  

    // Limitar o comprimento máximo conforme necessário
    setSearchValue(value.slice(0, maxLength));
  };
  const item=    [
    {
      title: 'pesquisa',
      description,
      style:{  color: 'white' },
      conteudo: <>
    
    <Input
        placeholder="Pesquisar nr da Matricula de veículo"
        size='small'
        value={searchValue}
        onChange={handleInputChange}
        style={{ width: 300, marginRight: 8 }}
        allowClear
        maxLength={selectedFormat === "AAA-123-PV" ? 10 : 9} // Defina o comprimento máximo com base no formato selecionado
        suffix={
          <Button
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{ backgroundColor: "#CD1719" }}
          />
        }
      />
      </>
    },
    {
      title: 'Pagamento',
      description,
      conteudo: <>
      <div>
      <Space  style={{marginLeft:'37%',marginBottom:'3%'}} direction="vertical">
              <Segmented
                onChange={onChangepay}
                options={[
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar
                          shape="square"
                          size={64}
                          src={
                            <img src={require("../../assets/img/ss.png")} />
                          }
                        />
                        <div>M-PESA</div>
                      </div>
                    ),
                    value: "pay1",
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar
                          shape="square"
                          size={64}
                          src={
                            <img src={require("../../assets/img/BCI.jpeg")} />
                          }
                        />
                        <div>BCI</div>
                      </div>
                    ),
                    value: "pay21",
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar
                          shape="square"
                          size={64}
                          src={
                            <img src={require("../../assets/img/BIM.png")} />
                          }
                        />
                        <div>BIM</div>
                      </div>
                    ),
                    value: "pay2",
                  },
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar
                          shape="square"
                          size={64}
                          src={
                            <img
                              src={require("../../assets/img/pos-terminal.png")}
                            />
                          }
                        />
                        <div>Pos</div>
                      </div>
                    ),
                    value: "pay3",
                  },
                ]}
              />
            </Space>
            <Typography.Title level={1} style={{ display: 'inline-block', marginLeft: '20px', verticalAlign: 'top' }}>
        Total a Pagar   <Typography.Text type="danger" style={{ marginLeft:'37%',display: 'block' ,fontSize:'24px' }}>
          {totalPurchaseAmount}
        </Typography.Text>
      </Typography.Title>
     
      </div>
      <div className="relative">
       
        <Table
          dataSource={vehicles}
          columns={columns}
          rowKey="id" // Assuming 'id' is the unique identifier for each vehicle
          pagination={false} // Disable pagination if needed
        />

        <Button type="primary" className="absolute right-0 top-0 mt-4 mr-4">Pagar</Button>
      </div>
      </>
    },
    {
      title: 'Recibo',
      description,
    },
  ]

  return (
    <div>
      <Typography.Title level={2} style={{ fontSize: "20px" }}>
        Pagamento da Taxa de Fusão de Rádio
      </Typography.Title>

      <Steps
       
        current={current}
        onChange={onChange}
        items={item
        }
      />
      <div className="steps-content mt-10">{item[current].conteudo}</div>

    </div>
  );
}

export default Fusao;
