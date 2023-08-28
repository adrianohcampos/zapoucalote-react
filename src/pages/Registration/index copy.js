import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
// import { Button, Paper, TextField } from "@material-ui/core";

// import Zoc from "../../Zoc";
import Helmet from "react-helmet";
import ReactGA from 'react-ga';

import './Registration.css';

const Registration = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

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
    }

    loadAll()
  }, [])

  return (
    <div className="page">
      <Helmet>
        <title>Zap ou Calote</title>
        <meta name="description" content="Zap ou Calote: Programa de namoro apresentado por Cid Cidoso. Site feito por fã." />
      </Helmet>

      <section className="registration" >
        <div className="registration--horizontal" >

        {/* <Paper>
          <h2>Form Demo</h2>

          <TextField
            onChange={onTextChange}
            value={textValue}
            label={"Text Value"} //optional
          />

          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Paper> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Nome" {...register("Nome", { required: true })} />
            <input type="text" placeholder="Apelido" {...register("Apelido", { required: true })} />
            <input type="email" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
            <input type="tel" placeholder="Telefone" {...register("Telefone", { required: true })} />
            <input type="text" placeholder="Idade" {...register("Idade", { required: true, min: 18 })} />
            <input type="text" placeholder="Cidade" {...register("Cidade", { required: true })} />
            <input type="text" placeholder="Profissão/Ocupação" {...register("Profissão/Ocupação", { required: true })} />
            <input type="text" placeholder="Signo" {...register("Signo", {})} />
            <input type="text" placeholder="Hobby" {...register("Hobby", { required: true })} />

            <label class="container">
            <input type="checkbox" placeholder="" {...register("Tenho +18 anos)", { required: true })} />
            Tenho +18 anos, resido em São Paulo - SP e tenho disponibilidade para participar presencialmente do Zap ou Calote (Uber ida e volta free)
            </label>
            

            <input type="submit" />
          </form>

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


    </div>
  );
}

export default Registration;
