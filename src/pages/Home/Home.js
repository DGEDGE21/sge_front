import React,{useState} from 'react'
import {

  DollarOutlined,
  CarOutlined,
  HistoryOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Popconfirm ,Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import RouteComponent from '../../routes/Route';


function getItem(label, key, icon, children=[], path = null) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

function Home() {
  const navigate = useNavigate();
  const [modalVisible,setModalVisible]=useState();
  const handleClick = (e) => {
    console.log('Clicked: ', e);
    navigate(e.key)

  }
  const items = [
  
    getItem('Estudantes', '9', <UserOutlined />, [
      getItem('Matricular', '/home/matricular/',null,null,'/home/matricular/'),
  
    
    getItem('Renovar Matricula', 'ff2',null,null),
    getItem('Actaulizar dados', 'ff3',null,null),
    getItem('Anular Matricula', 'ff4',null,null),
    getItem('Pagamentos', 'ff5',null,null),
    getItem('Listar', 'ff7',null,null),
  ]
  ),
    getItem('Cursos', '2', <HistoryOutlined />, [
      getItem('Criar', 'd6',null,null),
  
    
    getItem('Discilpinas', 'dff2',null,null),
    getItem('Listar', 'dff3',null,null),
    getItem('Turmas', 'dff4',null,null),
    getItem('editar', 'dff5',null,null),
   
  ]
  ),
    getItem('Docentes', 'sub2', <UserOutlined />,
     [
      getItem('Criar', 'd6',null,null),
  
    
    getItem('Discilpinas', 'dff2',null,null),
    getItem('Listar', 'dff3',null,null),
    getItem('Turmas', 'dff4',null,null),
    getItem('editar', 'dff5',null,null),]),
    getItem('Pagamentos', 'sub1', <DollarOutlined />, [
      getItem('taxa de radio fusao', '/home/radio_fusao/',null,null,'/home/radio_fusao/'),
      getItem('Outras Taxas', '4',null,null,'/radio-fusion-fee.'),
    
    ]),
   
  ];
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.clear(); 
    setModalVisible(false);
    window.location.href = '/'; 
};


  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          onClick={handleClick}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between", // Distribute items evenly along the main axis
            alignItems: "center",
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
              src={require("../../assets/img/icon_rm.png")}
              alt="Logo"
              style={{ width: "7%" }}
            />
          </div>

          <Popconfirm
            visible={modalVisible}
            title={`${localStorage.getItem("username")}. Deseja sair da conta?`}
            onConfirm={handleLogout}
            onCancel={() => setModalVisible(false)}
            okText="Sim"
            cancelText="Não"
            okButtonProps={{ style: { backgroundColor: "red" } }}
          >
            <div
              onClick={() => setModalVisible(true)}
              className="flex items-center text-blue-900 cursor-pointer hover:text-blue-700 mr-10"
            >
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </div>
          </Popconfirm>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <RouteComponent />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
        Instituto Médio Politécnico de Chibuto ©{new Date().getFullYear()} Criado por Pixel SA
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home