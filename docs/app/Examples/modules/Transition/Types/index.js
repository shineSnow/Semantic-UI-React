import React from 'react'

import ComponentExample from 'docs/app/Components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/app/Components/ComponentDoc/ExampleSection'

const TransitionTypesExamples = () => (
  <ExampleSection title='Types'>
    <ComponentExample
      title='Transition'
      description={[
        'Transitions provide a wrapper for using CSS transitions in Javascript providing cross-browser callbacks,',
        'advanced queuing, and feature detection.',
      ].join(' ')}
      examplePath='modules/Transition/Types/TransitionExampleExplorer'
    />
  </ExampleSection>
)

export default TransitionTypesExamples
