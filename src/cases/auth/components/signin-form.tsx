import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignIn } from "../hooks/use-signin";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

export type LoginSchema = z.infer<typeof formSchema>;

export function SignInForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectURL = searchParams.get("redirect") || "/";
    const { mutate, isPending, error } = useSignIn();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" }
    });

    function onSubmit(values: LoginSchema) {
        mutate(values, { onSuccess: () => navigate(redirectURL) });
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-black px-4 pt-32">
            <div className="w-full max-w-md bg-gray-900 p-12 rounded-xl shadow-xl">
                <h1 className="text-center text-4xl font-extrabold text-red-600 mb-8">Librarium</h1>

                {error && (
                    <p className="mb-6 text-center text-red-500">
                        {(error as any).response?.data?.message || "Erro ao realizar login"}
                    </p>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                            disabled={isPending}
                        >
                            {isPending ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-gray-400 mt-6">
                    Não tem uma conta?{" "}
                    <span
                        className="text-red-600 cursor-pointer hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Cadastre-se
                    </span>
                </p>
            </div>
        </div>
    )
}