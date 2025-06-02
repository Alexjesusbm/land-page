import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Venda seus produtos como afiliado em um único lugar</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Crie o seu site em menos de 5 minutos</p>
          <p>Acompanhe e otimize seu negócio online</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};
