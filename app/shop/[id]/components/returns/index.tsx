import { CANCEL_ANSWERS, RETURN_ANSWERS, RETURN_POLICY, WRONGITEM_ANSWERS } from '@/app/constants'
import { DynamicListAnswers } from '@/components/dynamic-import'
import { Question } from '@/components/page-components'

type Props = {}

const Returns = (props: Props) => {
	return (
		<div>
			<Question question="WHAT IS FOR THE DREAMERS RETURN POLICY?" />
			<DynamicListAnswers answers={RETURN_POLICY} />
			<div className="py-5" />
			<Question question="I WANT TO RETURN MY ITEM FOR AN EXCHANGE/REFUND." />
			<DynamicListAnswers answers={CANCEL_ANSWERS} />
			<div className="py-5" />
			<Question question="I NEED TO RETURN A FAULTY ITEM." />
			<DynamicListAnswers answers={RETURN_ANSWERS} />
			<Question question="I RECEIVED THE WRONG ITEM." />
			<DynamicListAnswers answers={WRONGITEM_ANSWERS} />
		</div>
	)
}

export default Returns
