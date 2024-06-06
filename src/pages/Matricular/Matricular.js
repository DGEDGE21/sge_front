import React, { useState } from 'react';
import { Input, Button, Table, message, Typography, Steps, Space, Segmented, Avatar, Form, Row, Col, DatePicker, Select } from 'antd';
import { SearchOutlined, BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import { fetchUserVehicles } from '../../api/Api';
import moment from 'moment';

const { Option } = Select;

function Matricular() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('AAA-123-PV');
  const [current, setCurrent] = useState(0);
  const [vehicles, setVehicles] = useState([]);
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
          setVehicles(data);
          setCurrent(1);
        })
        .catch((error) => {
          console.error("Error fetching user vehicles:", error);
        });
      console.log('Searching for:', searchValue);
    } else {
      message.error('Matrícula inválida. Por favor, insira uma matrícula válida.');
    }
  };

  const onChangepay = (value) => {
    console.log(value);
  };

  const totalPurchaseAmount = 2500;

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

  const onFinish = () => {
    setCurrent(1);
  };

  const item = [
    {
      title: 'Dados',
      description,
      style: { color: 'white' },
      conteudo: (
        <>
          <Form
            name="student-registration"
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nome Próprio"
                  name="firstName"
                  rules={[{ required: true, message: 'Por favor, insira o nome próprio!' }]}
                >
                  <Input placeholder="Nome Próprio" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Apelido"
                  name="lastName"
                  rules={[{ required: true, message: 'Por favor, insira o apelido!' }]}
                >
                  <Input placeholder="Apelido" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Data de Nascimento"
                  name="birthDate"
                  rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
                >
                  <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Número de BI"
                  name="biNumber"
                  rules={[{ required: true, message: 'Por favor, insira o número de BI!' }]}
                >
                  <Input placeholder="Número de BI" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Data de Emissão do BI"
                  name="biIssueDate"
                  rules={[{ required: true, message: 'Por favor, insira a data de emissão do BI!' }]}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Data de Expiração do BI"
                  name="biExpiryDate"
                  rules={[{ required: true, message: 'Por favor, insira a data de expiração do BI!' }]}
                >
                  <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="NUIT"
                  name="nuit"
                  rules={[{ required: true, message: 'Por favor, insira o NUIT!' }]}
                >
                  <Input placeholder="NUIT" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Endereço"
                  name="address"
                  rules={[{ required: true, message: 'Por favor, insira o endereço!' }]}
                >
                  <Input placeholder="Endereço" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Por favor, insira o email!' }, { type: 'email', message: 'Por favor, insira um email válido!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Número de Celular"
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Por favor, insira o número de celular!' }]}
                >
                  <Input placeholder="Número de Celular" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nome do Pai"
                  name="fatherName"
                  rules={[{ message: 'Por favor, insira o nome do pai!' }]}
                >
                  <Input placeholder="Nome do Pai" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nome da Mãe"
                  name="motherName"
                  rules={[{ message: 'Por favor, insira o nome da mãe!' }]}
                >
                  <Input placeholder="Nome da Mãe" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrar Estudante
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      title: 'Educação e Curso',
      description,
      conteudo: (
        <>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nome da Escola Anterior"
                  name="previousSchool"
                  rules={[{ required: true, message: 'Por favor, insira o nome da escola anterior!' }]}
                >
                  <Input placeholder="Nome da Escola Anterior" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ano de Conclusão do 12º Ano ou Nível Médio"
                  name="graduationYear"
                  rules={[{ required: true, message: 'Por favor, insira o ano de conclusão!' }]}
                >
                  <DatePicker picker="year" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Curso Pretendido"
                  name="desiredCourse"
                  rules={[{ required: true, message: 'Por favor, selecione o curso pretendido!' }]}
                >
                  <Select placeholder="Selecione o Curso">
                    <Option value="curso1">Curso 1</Option>
                    <Option value="curso2">Curso 2</Option>
                    <Option value="curso3">Curso 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Regime"
                  name="regime"
                  rules={[{ required: true, message: 'Por favor, selecione o regime!' }]}
                >
                  <Select placeholder="Selecione o Regime">
                    <Option value="diurno">Diurno</Option>
                    <Option value="noturno">Noturno</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Próximo
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      title: 'Recibo',
      description,
      conteudo: (
        <>
          <div>
            <Space direction="horizontal" size='large'>
              <Segmented
                onChange={onChangepay}
                options={[
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar
                          shape="square"
                          size={64}
                          src={<img src={require("../../assets/img/ss.png")} alt="M-PESA" />}
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
                          src={<img src={require("../../assets/img/emola.png")} alt="M-PESA" />}
                        />
                        <div>E-MOLA</div>
                      </div>
                    ),
                    value: "emola",
                  },
                
                  {
                    label: (
                      <div style={{ padding: 4 }}>
                        <Avatar
                          shape="square"
                          size={64}
                          src={<img src={require("../../assets/img/BCI.jpeg")} alt="BCI" />}
                        />
                        <div>BCI</div>
                      </div>
                    ),
                    value: "pay21",
                  },
                
                ]}
              />
                 <Typography.Title level={2} style={{ display: 'inline-block', marginLeft: '20px', verticalAlign: 'top' }}>
              Total a Pagar
              <Typography.Text type="danger" style={{ marginLeft: '37%', display: 'block', fontSize: '24px' }}>
                {totalPurchaseAmount}
              </Typography.Text>
            </Typography.Title>
         
            </Space>
          </div>
          <div className="relative">
           
            <Button type="primary" className="absolute right-0 top-0 mt-4 mr-4">Pagar</Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={2} style={{ fontSize: "20px" }}>
        Matricular Estudante
      </Typography.Title>
      <Steps
        current={current}
        onChange={onChange}
        items={item}
      />
      <div className="steps-content mt-10">{item[current].conteudo}</div>
    </div>
  );
}

export default Matricular;
