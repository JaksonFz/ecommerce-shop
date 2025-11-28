import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../hooks/use-signUp";

const formSchema = z.object({
  name: z.string().nonempty("O nome completo é obrigatório"),
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

export type SignUpSchema = z.infer<typeof formSchema>;

export function SignUpForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate, isPending, error } = useSignUp();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" }
  });

  function onSubmit(values: SignUpSchema) {
    mutate(values, { onSuccess: () => navigate("/signin") });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-red-600 mb-6">Librarium</h1>

        {error && (
          <p className="mb-4 text-center text-red-500">
            {(error as any).response?.data?.message || "Erro ao cadastrar usuário"}
          </p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nome Completo</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Seu nome completo" {...field} className="bg-gray-800 text-white border-gray-700 placeholder-gray-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} className="bg-gray-800 text-white border-gray-700 placeholder-gray-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className="bg-gray-800 text-white border-gray-700 placeholder-gray-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isPending}>
              {isPending ? "Cadastrando..." : "Cadastre-se"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400 mt-4">
          Já possui conta?{" "}
          <span className="text-red-600 cursor-pointer hover:underline" onClick={() => navigate("/signin")}>
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
