import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputTexto } from "../components/InputComponente";
import { Select } from "../components/Select";
import { SeletorData } from "../components/SeletorData";
import { ModalAviso } from "../components/modalAviso";
import { criarAgendamento, editarAgendamento } from "../store/Agendamentos";
import { validarCpf } from "../utils/validarCpf";

export function CadastroAgendamento() {
  //Tamanho da página
  const largura = window.screen.width;
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const history = useNavigate();
  const { state } = useLocation();
  const [dataHora, setDataHora] = useState("");
  const [estadoModal, setEstadoModal] = useState(false);

  const abrirModal = () => setEstadoModal(true);

  //fecha modal e volta para a home
  const fecharModal = () => {
    setEstadoModal(false);
    history("/");
  };

  //salvar dados
  const onSubmit = (data) => {
    if (state?.data) {
      const agendamentosDataId = {
        id: state?.data?.id,
        data: dataHora,
        ...data,
      };
      dispatch(editarAgendamento(agendamentosDataId));
    } else {
      const agendamentoData = { data: dataHora, ...data };
      dispatch(criarAgendamento(agendamentoData));
    }
    abrirModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ justifyContent: "center", display: "flex" }}>
      <Box
        sx={[
          {
            width: "100%",
          },
          largura > 700
            ? {
                padding: "45px",
                border: 1,
                borderRadius: "16px",
                borderColor: "rgb(223 219 219)",
              }
            : { padding: "2px" },
        ]}
        m={6}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "rgb(75,78,252)" }}
        >
          Agendamentos
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
            }}
          >
            <Link to={"/"}>
              <Typography sx={{ color: "gray", fontSize: 15 }} mb={1}>
                Listagem
              </Typography>
            </Link>
            <ArrowForwardIosIcon
              sx={{ color: "gray", fontSize: 16, marginTop: "3px" }}
            />
            {state?.data ? (
              <Typography sx={{ color: "gray", fontSize: 15 }} mb={1}>
                Edição
              </Typography>
            ) : (
              <Typography sx={{ color: "gray", fontSize: 15 }} mb={1}>
                Cadastro
              </Typography>
            )}
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SeletorData selecionar={setDataHora} valor={dataHora} />
          <Grid container spacing={2} mt={3} mb={3}>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2px",
                }}
              >
                <Controller
                  name="nome"
                  control={control}
                  defaultValue={state?.data?.nome}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTexto
                      nome="*Nome"
                      value={value}
                      onChange={onChange}
                      error={error}
                      tipo={"text"}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Controller
                  name="cpf"
                  control={control}
                  defaultValue={state?.data?.cpf}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTexto
                      nome="*CPF"
                      value={value?.replace(/\D/g, "")}
                      onChange={onChange}
                      error={error}
                      maxCaracteres={11}
                      validacao={validarCpf}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Controller
                  name="cartaoSUS"
                  control={control}
                  defaultValue={state?.data?.cartaoSUS}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTexto
                      nome="*Cartão do SUS"
                      value={value?.replace(/\D/g, "")}
                      onChange={onChange}
                      error={error}
                      maxCaracteres={15}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Controller
                  name="motivoAtendimento"
                  control={control}
                  defaultValue={state?.data?.motivoAtendimento}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTexto
                      nome="*Motivo do atendimento"
                      value={value}
                      onChange={onChange}
                      error={error}
                      tipo={"text"}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>

            <Grid item xs={5}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Controller
                  defaultValue={state?.data?.medicoAtendente}
                  name="medicoAtendente"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTexto
                      nome="*Médico atendente"
                      value={value}
                      onChange={onChange}
                      error={error}
                      tipo={"text"}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Controller
                  name="profissionalAgendamento"
                  control={control}
                  defaultValue={state?.data?.profissionalAgendamento}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputTexto
                      nome="*Profissional do Agendamento"
                      value={value}
                      onChange={onChange}
                      error={error}
                      tipo={"text"}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Controller
                  name="urgencia"
                  control={control}
                  defaultValue={state?.data?.urgencia}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      nome={"urgencia"}
                      options={[
                        "*Urgência",
                        "baixa",
                        "media",
                        "alta",
                        "urgente",
                      ]}
                      onChange={onChange}
                      value={value}
                      error={error}
                    />
                  )}
                  rules={{ required: "Campo obrigatório" }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "5px",
              alignSelf: "flex-end",
            }}
          >
            <Button
              type="submit"
              sx={{
                bgcolor: "rgb(75,78,252)!important",
                borderRadius: "10px",
                maxHeight: "80px",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold", color: "white", fontSize: 10 }}
                py={1}
                px={2}
              >
                Salvar
              </Typography>
            </Button>
          </Box>
        </form>
        <ModalAviso
          estadoModal={estadoModal}
          fechar={fecharModal}
          aviso={"Dado salvo com sucesso!"}
        />
      </Box>
    </Container>
  );
}
