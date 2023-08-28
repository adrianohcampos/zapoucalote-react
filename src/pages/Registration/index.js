import React, { useEffect, useState } from "react";
import {
  TextField, Button, Stack, Card, FormControl,
  InputLabel,
  Select, MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert
} from "@mui/material";
import { useForm } from "react-hook-form";

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import Helmet from "react-helmet";
import ReactGA from 'react-ga';
import axios from 'axios';
import './Registration.css';

const Registration = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [cadastro, setCadastro] = useState(1);


  const form = useForm({
    defaultValues: {
      convidado: '',
      nome: '',
      apelido: '',
      email: '',
      idade: '',
      cidade: '',
      profissao: '',
      signo: '',
      hobby: ''
    }
  });

  const { register, handleSubmit, formState, reset } = form
  const { errors } = formState;
  const onSubmit = async (data) => {

    setIsLoading(true);

    console.log(data)

    try {

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        if (key === "foto") {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });


      const response = await axios.post('https://acampos.com.br/zoc-api/index.php?reg=1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setIsLoading(false);
        console.log('Post enviado com sucesso!', response.data);
      } else {
        setIsLoading(false);
        console.error('Erro ao enviar o post.', response.data);
      }

      setCadastro(2);
    } catch (error) {
      console.error('Erro:', error);
    }

    reset();

  }

  useEffect(() => {

    // Rastrear a visualização da página
    ReactGA.pageview(window.location.pathname + window.location.search);

    const loadAll = async () => {
      setIsLoading(true);

      try {

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      setCadastro(1);
    }

    loadAll()
  }, [])

  return (
    <div className="page">

      <Helmet>
        <title>Zap ou Calote</title>
        <meta name="description" content="Zap ou Calote: Programa de namoro apresentado por Cid Cidoso. Site feito por fã." />
      </Helmet>


      <section className="featured" style={{ backgroundImage: `url(bg-reg.jpg)` }}>
        <div className="featured--vertical">
          <div className="featured--horizontal">

            <div className="featured--name">Inscrições</div>
            <div className="featured--info">
              <div className="featured--seasons">Temporada 3</div>
            </div>
            <div className="featured--description">Está pronto(a) para encontrar conquistar o Zap? Ou ficar com o evelope e dar aquele colote gostoso? Então você está no lugar certo! O "Zap ou Calote" é o programa de namoro mais divertido e inovador da atualidade, e estamos à procura de candidatos como você!</div>
            <div className="featured--buttons">
              <HashLink smooth to="/registration#form" className="featured--watchbutton"><AddIcon style={{ fontSize: 40 }} /> Inscrever-se</HashLink>
              <Link to={`/`} className="featured--titlebutton"><ArrowBackIcon style={{ fontSize: 40 }} /> Voltar</Link>
            </div>
          </div>
        </div>
      </section>






      <section className="registration" id="form">
        <div className="registration--horizontal" >

          <Card style={{ minWidth: '60vw' }}>

            <form onSubmit={handleSubmit(onSubmit)} noValidate >
              <Stack spacing={2} sx={{ p: 3 }}>
                <h2>Formulário de inscrição</h2>


                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Convidado</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Convidado"
                    {...register("convidado", {
                      required: "Convidado é obrigatório"
                    })}
                    errors={!!errors.convidado}
                    helperText={errors.convidado?.message}
                  >
                    <MenuItem value='meuaroba1'>10/10 - Nome Convidado @meuaroba1</MenuItem>
                    <MenuItem value='meuaroba2'>20/10 - Nome Convidado @meuaroba2</MenuItem>
                    <MenuItem value='meuaroba3'>01/11 - Nome Convidado @meuaroba3</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Nome" type="text" {...register("nome", {
                  required: "Nome é obrigatório"
                })}
                  errors={!!errors.nome}
                  helperText={errors.nome?.message} />

                <TextField label="Apelido" type="text" {...register("apelido", {
                  required: "Apelido é obrigatório"
                })}
                  errors={!!errors.apelido}
                  helperText={errors.apelido?.message} />

                <TextField label="Email" type="email" {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i
                })}
                  errors={!!errors.email}
                  helperText={errors.email?.message} />

                <TextField label="Idade" type="text" {...register("idade", {
                  required: "Idade é obrigatório",
                  min: 18
                })}
                  errors={!!errors.idade}
                  helperText={errors.idade?.message} />

                <TextField label="Cidade" type="text" {...register("cidade", {
                  required: "Cidade é obrigatório"
                })}
                  errors={!!errors.cidade}
                  helperText={errors.cidade?.message} />

                <TextField label="Profissão/Ocupação" type="text" {...register("profissao", {
                  required: "Profissão é obrigatório"
                })}
                  errors={!!errors.profissao}
                  helperText={errors.profissao?.message} />

                <TextField label="Signo" type="text" {...register("signo", {
                  required: "Signo é obrigatório"
                })}
                  errors={!!errors.signo}
                  helperText={errors.signo?.message} />

                <TextField label="Hobby" type="text" {...register("hobby", {
                  required: "Hobby é obrigatório"
                })}
                  errors={!!errors.hobby}
                  helperText={errors.hobby?.message} />

                <TextField label="Foto" type="file" {...register("foto")}
                  accept="image/*"
                  errors={!!errors.file}
                  helperText={errors.file?.message} />

                <FormGroup>
                  <FormControlLabel required control={<Checkbox />} {...register("tenho18", {
                    required: "Campo obrigatório"
                  })}
                    errors={!!errors.tenho18}
                    helperText={errors.tenho18?.message}
                    label="Tenho +18 anos, resido em São Paulo - SP e tenho disponibilidade para participar presencialmente do Zap ou Calote (Uber ida e volta free)" />
                </FormGroup>


                <div className="featured--buttons">
                  <Button type='submit' variant='contained'>
                    Enviar Inscrição
                  </Button>
                </div>



                {cadastro === 2 && (
                  <section id="form"><Alert severity="success">Inscrição enviada</Alert></section>
                )}

              </Stack>
            </form>
          </Card>



        </div>
      </section>


      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> por <a href="https://acampos.com.br" className="link" target="_blank" rel="noreferrer">Adriano Campos</a>
      </footer>

      {isLoading && (
        <div className="loading">
          <img src="https://data.whicdn.com/images/350654273/original.gif" alt="loading" />
        </div>
      )}


    </div >
  );
}

export default Registration;