import React, { useState } from 'react';
import { Form, Input, Button, message, theme,Row,Select, Col,Breadcrumb, Layout,Typography,Steps,DatePicker } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';
import { registerUserAndCar } from '../../api/Api';
import moment from 'moment';
const { Option } = Select;
const Signup = () => {
  const [current, setCurrent] = useState(0);
  const { Header, Content, Footer } = Layout;
  const [loading, setLoading] = useState(false);
  const [utente,setUtente]=useState(null);
  const [form] = Form.useForm();
  const [selectedFormat, setSelectedFormat] = useState('AAA-123-PV');
  const [car,setCar]=useState(null)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onChange = (value) => {
    console.log("onChange:", value);
    
   
    if (utente != null) {
      setCurrent(value);
    }
    
  };
  const validarMatricula = (matricula) => {
    const padrao = selectedFormat === 'MMM-11-11' ? /^[A-M]{1}[A-Z]{2}-\d{2}-\d{2}$/ : /^[A-Z]{3}-\d{3}-[A-Z]{2}$/;
    return padrao.test(matricula);
  };
  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase(); 
    console.log(value);

    const maxLength = value.startsWith('M') ? 9 : 10;
   
    if (maxLength === 9) {
        setSelectedFormat('MMM-11-11');
        if (value.length === 3 || value.length === 6) {
            value += '-';
        }
    } else {
        setSelectedFormat('AAA-123-PV');
        if (value.length === 3 || value.length === 7) {
            value += '-';
        }
    }

    // Limit the input value using slice
    value = value.slice(0, maxLength);

    // Update the form field value directly
 
   form.setFieldValue({matricula:'AAAAA'})
};


  const onFinish = async (values) => {
    setLoading(true);
    console.log(values)
    setUtente(values);

    if (utente != null) {
      setCurrent(1);
    }
    setLoading(false)
    
    
  };


  const onFinish_car = async (values) => {
    const nomeWithoutSpaces = utente.nome.replace(/\s/g, "");
    const userData = {
      username: nomeWithoutSpaces,
      email: utente.email,
      password: "Magoanine32",
    };
    setLoading(true);
    console.log(utente);
    if (validarMatricula(values.matricula)) {
      setCar(values);
      if (car != null) {
        // Call the API function to register user and car
        try {
          const response = await registerUserAndCar(userData, utente, car);
          console.log("Registration successful:", response.data);
          setCurrent(2);
        } catch (error) {
          console.error("Registration failed:", error);
          message.error("Registration failed. Please try again.");
        }
      }
    } else {
      message.error(
        "Matrícula inválida. Por favor, insira uma matrícula válida."
      );
    }
    setLoading(false);
  };


  const item = [
    {
      title: "Dados Basicos",

      style: { color: "white" },
      conteudo: (
        <>
          <Form
            name="signup_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nome"
                  label="Nome"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o seu Nome!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="data_nascimento"
                  label=" Data de Nascimento"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a data de nascimento!",
                    },
                  ]}
                >
                  <DatePicker 
                  />
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label=" E-mail"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o endereco de email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="telefone"
                  label="Telefone"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o numero de telefone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="endereco"
                  label=" Endereço"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o endereco!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="identificacao"
                  label=" Bilhete identificação"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o nr do B.I!",
                    },
                    {
                      pattern: /^[0-9]{12}[A-Za-z]$/,
                      message:
                        "O Bilhete identificação deve ter 12 dígitos seguidos de uma letra!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nuit"
                  label="NUIT"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o NUIT!",
                    },
                    {
                      pattern: /^\d{9}$/,
                      message: "NUIT deve ter exatamente 9 dígitos!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nacionalidade"
                  label="  Nacionalidade"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o sua Nacionalidade!",
                    },
                  ]}
                >
                  <Input defaultValue="Moçambicano(a)" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="genero"
                  label="Gênero"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione o gênero!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="masculino">Masculino</Select.Option>
                    <Select.Option value="feminino">Feminino</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* Coluna vazia para manter o layout */}
              <Col span={12}></Col>
            </Row>

            <Row gutter={16}>
              <Col span={12} style={{ textAlign: "left" }}>
                <Form.Item>
                  <Button href="/">Cancelar</Button>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    confirmar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
    },
    {
      title: "Activo",
      conteudo: (
        <>
          <Form
        
            name="vehicle_registration_form"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish_car}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="matricula"
                  label="Matrícula"
                  
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a matrícula do veículo!",
                    },
                  ]}
                >
                  <Input 
               
                  onChange={handleInputChange}
                  allowClear
                  maxLength={selectedFormat === "AAA-123-PV" ? 10 : 9}
                  
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="marca"
                  label="marca"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a marca do veículo!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="modelo"
                  label="Modelo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o modelo do veículo!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ano_fabricacao"
                  label="Ano de Fabricação"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, insira o ano de fabricação do veículo!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="ano_compra"
                  label="Ano de Compra"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o ano de compra do veículo!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cor"
                  label="Cor"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a cor do veículo!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="numero_chassi"
                  label="Número do Chassi"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, insira o número do chassi do veículo!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="cilindrada"
                  label="Cilindrada"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, insira o número da Cilindrada!",
                    },
                  ]}
                >
                  <Input type='number'/>
                </Form.Item>
              </Col>

         

              <Col span={12}>
                <Form.Item
                  name="lotacao"
                  label="Lotação"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a lotação do veículo!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tipo"
                  label="Tipo"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione o tipo do veículo!",
                    },
                  ]}
                >
                  <Select style={{ width: "100%" }}>
                    <Option value="ligeiro">Ligeiro</Option>
                    <Option value="pesado_passageiro">
                      Pesado de Passageiro
                    </Option>
                    <Option value="pesado_carga">Pesado de Carga</Option>
                    <Option value="trailer">Trailer</Option>
                    <Option value="motociclo">Motociclo</Option>
                 
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="combustivel"
                  label="Combustivel"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione o tipo do veículo!",
                    },
                  ]}
                >
                  <Select style={{ width: "100%" }}>
                    <Option value="Gasolina">Gasolina</Option>
                    <Option value="Diesel">
                      Diesel
                    </Option>
                 
                 
                  </Select>
                </Form.Item>
              </Col>
            
              <Col span={12}>
                <Form.Item
                  name="capacidade_carga"
                  label="Capacidade de Carga (kg)"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor, insira a capacidade de carga do veículo!",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="natatureza"
                  label="Natureza"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione a natureza do veículo!",
                    },
                  ]}
                >
                  <Select style={{ width: "100%" }}>
                    <Option value="singular">Singular</Option>
                    <Option value="empresa">Empresa</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

     

            <Row gutter={16}>
              <Col span={24} style={{ textAlign: "right" }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Confirmar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
    },
  
    {
      title: "Registrado",
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={require("../../assets/img/rm.png")}
            alt="Logo"
            style={{ width: "7%" }}
          />
        </div>
      </Header>
      <Content
        style={{
          padding: "0 16px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        ></Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
           
          <Typography.Title level={2} style={{ fontSize: "20px" }}>
             Cadastrar-se
          </Typography.Title>

          <Steps current={current} onChange={onChange} items={item} />
          <div className="steps-content mt-10">{item[current].conteudo}</div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Rádio de Moçambique ©{new Date().getFullYear()} Criado por MAPI
      </Footer>
    </Layout>
  );
};

export default Signup;
