import { zodResolver } from '@hookform/resolvers/zod'
import type { DefaultValues, FieldValues, Resolver } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { ZodType } from 'zod'

interface IUseValidate<TForm extends FieldValues> {
  defaultValues: DefaultValues<TForm>
  schema?: ZodType<TForm>
}

const useValidate = <TForm extends FieldValues>({ schema, defaultValues }: IUseValidate<TForm>) => {
  const form = useForm<TForm>({
    defaultValues,
    resolver: schema ? (zodResolver(schema) as Resolver<TForm>) : undefined,
  })
  const {
    getValues,
    setValue,
    resetField,
    setError,
    reset,
    handleSubmit,
    register,
    watch,

    formState: { errors },
  } = form

  return {
    getValues,
    setValue,
    resetField,
    setError,
    reset,
    handleSubmit,
    register,
    watch,
    form,
    errors,
  }
}

export default useValidate
