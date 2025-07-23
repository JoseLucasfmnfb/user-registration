'use client'
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Card,
	CardContent,
} from "@/components/ui/card"
import {
	Input
} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { formSchema } from "@/utils/formValidations"
import { formatPhone } from "@/utils/formaters"
import { Eye, EyeOff } from "lucide-react"

export default function CadastroUsuario() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			termos: false
		}
	})

	const onSubmit = async (data: any) => {
		const result = formSchema.safeParse(data)
		if (!result.success) {
			console.log("Erros de validação:", result.error.format())
			return
		}

		console.log("Dados válidos:", result.data)
	}

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardContent className="p-6">
					<div className="flex justify-center mb-4">
						<Image
							src="/hospital-logo.png"
							alt="Logo do Hospital"
							width={120}
							height={120}
							className="w-auto"
							priority
						/>
					</div>
					<h2 className="text-2xl font-bold text-center text-[#2E2E72] mb-4">Cadastro de Usuário</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<Label htmlFor="nome" className="mb-2">Nome completo*</Label>
							<Input id="nome" {...register("nome")} />
							{errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
						</div>
						<div>
							<Label htmlFor="email" className="mb-2">E-mail*</Label>
							<Input id="email" type="email" {...register("email")} />
							{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
						</div>
						<div className="relative">
							<Label htmlFor="senha">Senha*</Label>
							<Input
								id="senha"
								type={showPassword ? "text" : "password"}
								{...register("senha")}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-2 top-6 text-gray-500 cursor-pointer"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
							{errors.senha && <p className="text-sm text-red-500">{errors.senha.message}</p>}
						</div>
						<div className="relative">
							<Label htmlFor="confirmarSenha">Confirmar Senha*</Label>
							<Input
								id="confirmarSenha"
								type={showConfirmPassword ? "text" : "password"}
								{...register("confirmarSenha")}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-2 top-6 text-gray-500 cursor-pointer"
							>
								{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
							{errors.confirmarSenha && <p className="text-sm text-red-500">{errors.confirmarSenha.message}</p>}
						</div>
						<Controller
							name="telefone"
							control={control}
							render={({ field }) => (
								<div>
									<Label htmlFor="telefone" className="mb-2">Telefone</Label>
									<Input
										id="telefone"
										type="tel"
										value={formatPhone(field.value) ?? ""}
										onChange={(e) => field.onChange(formatPhone(e.target.value))}
										placeholder="(99) 99999-9999"
									/>
								</div>
							)}
						/>
						<div>
							<Label htmlFor="nascimento" className="mb-2">Data de Nascimento</Label>
							<Input id="nascimento" type="date" {...register("nascimento")} />
						</div>
						<div>
							<Label htmlFor="genero" className="mb-2">Gênero</Label>
							<Select onValueChange={(value) => setValue("genero", value)}>
								<SelectTrigger id="genero">
									<SelectValue placeholder="Selecione o gênero" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="feminino">Feminino</SelectItem>
									<SelectItem value="masculino">Masculino</SelectItem>
									<SelectItem value="outro">Outro</SelectItem>
									<SelectItem value="prefiro-nao-dizer">Prefiro não dizer</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="termos" onCheckedChange={(checked) => setValue("termos", checked === true)} />
							<Label htmlFor="termos">Aceito os termos de uso*</Label>
						</div>
						{errors.termos && <p className="text-sm text-red-500">{errors.termos.message}</p>}
						<Button type="submit" className="w-full bg-[#2E2E72] hover:bg-[#1c1c5a]">Cadastrar</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
