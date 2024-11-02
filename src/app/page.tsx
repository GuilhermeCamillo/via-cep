"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";
import viaceplogo from "../../public/viacep.png";
import InformationData from "./InformationData";
import { toast } from "sonner";

type Address = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export default function Home() {
  const [codeIsLoading, setCodeIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<Address | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (code: string) => {
      if (!code) {
        setAddress(null);
        return;
      }
      try {
        setCodeIsLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${code}/json/`
        );
        if (response.data?.erro) {
          toast.warning("CEP não encontrado para os dados informados.", {
            position: "top-right",
          });
          setAddress(null);
          setCodeIsLoading(false);
          return;
        }
        setAddress(response.data);
        setCodeIsLoading(false);
      } catch (error) {
        toast.warning(
          "Erro ao buscar o CEP. Verifique se o número do CEP está correto e tente novamente.",
          { position: "top-right" }
        );
        setCodeIsLoading(false);
        console.log(error);
      }
    }, 1000),
    []
  );

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center bg-white p-4 rounded-md lg:min-w-[500px] gap-4">
        <div className="rounded-sm bg-teal-900 p-2">
          <Image
            src={viaceplogo}
            alt="viacep image"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-medium text-md">Digite o cep:</Label>
          <IMaskInput
            className={cn(
              "w-full py-[8px] border rounded-md px-3 shadow-sm text-sm h-[40px] placeholder-slate-500 border-slate-400"
            )}
            placeholder="Exemplo: 00000-000"
            mask="00000-000"
            onAccept={(e) => debouncedSearch(e)}
          />
        </div>

        <div className="flex flex-col gap-4 w-full justify-center">
          <Label className="font-medium text-md">Dados:</Label>
          <div className="grid grid-cols-3 gap-4">
            <InformationData
              label={"Logradouro"}
              text={address?.logradouro}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"Bairro"}
              text={address?.bairro}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"Cidade"}
              text={address?.localidade}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"Estado"}
              text={address?.estado}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"UF"}
              text={address?.uf}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"Região"}
              text={address?.regiao}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"DDD"}
              text={address?.ddd}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"GIA"}
              text={address?.gia}
              isLoading={codeIsLoading}
            />

            <InformationData
              label={"IBGE"}
              text={address?.ibge}
              isLoading={codeIsLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
