import { ErrorBoundary } from "@/components/core";
import { Container, Grid } from "@mui/material";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { ListTodo } from "./todo";

interface HomePageProps {}

export default function HomePage(props: HomePageProps) {
  const {} = props;

  return (
    <div>
      <Helmet>
        <title>List Todo</title>
        <meta
          name="description"
          // TODO: Fix content
          content="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
        >
        </meta>
      </Helmet>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ErrorBoundary>
              <Suspense fallback={"loading..."}>
                <ListTodo />
              </Suspense>
            </ErrorBoundary>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
