import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '~/components/Layout'
import { PageContainer } from '~/components/styled'
type CategoryPageProps = {
  categoryId?: number
}

const CategoryPage: NextPage<CategoryPageProps> = ({ categoryId }) => {
  return (
    <Layout>
      <PageContainer horizontalPad={10}>
        <h1>CATEGORIA {categoryId}</h1>
        <p>Info da categoria</p>
        <h2>INSCRITOS NA CATEGORIA</h2>
        <p>
          Lista de duplas inscritas da tabela <code>subscriptions</code>
        </p>
      </PageContainer>
    </Layout>
  )
}

export default CategoryPage

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async () => {
  const categoryId = 0
  return {
    props: { categoryId }
  }
}
