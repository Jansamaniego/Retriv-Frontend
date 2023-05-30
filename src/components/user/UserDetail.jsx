import React from 'react'

const UserDetail = () => {
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Update profile</h1>
        <Input placeholder="Username" type="text" {...register('username')} />
        {errors.username?.message && <p>{errors.username?.message}</p>}
        <Input placeholder="Email" type="email" {...register('email')} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <Input placeholder="name" type="text" {...register('name')} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <Input placeholder="Address" type="text" {...register('address')} />
        {errors.address?.message && <p>{errors.address?.message}</p>}
        <Input
          placeholder="Phone"
          type="number"
          {...register('phone', { valueAsNumber: true })}
        />
        {errors.phone?.message && <p>{errors.phone?.message}</p>}
        <Select {...register('gender')}>
          <option value={gender}>{gender}</option>
          {genderOptions.map((genderOption) => {
            if (genderOption === gender) return null;
            return (
              <option value={genderOption} key={genderOption}>
                {`${genderOption
                  .toString()
                  .charAt(0)
                  .toUpperCase()}${genderOption.slice(1)}`}
              </option>
            );
          })}
        </Select>
        {errors.gender?.message && <p>{errors.gender?.message}</p>}
        <Input
          placeholder="DateOfBirth"
          type="date"
          {...register('dateOfBirth', { valueAsDate: true })}
        />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
        <Button type="submit" disabled={isLoading}>
          Update Profile
        </Button>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
}

export default UserDetail