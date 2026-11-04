import { NextRequest, NextResponse } from 'next/server';
import { evaluateAnswer } from '@/lib/evaluation';
import { getQuestionById } from '@/lib/questions';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transcript = (body.transcript || '').trim();
    const questionId = body.questionId;
    const customQuestionText = body.questionText;

    if (!transcript) {
      return NextResponse.json(
        {
          success: false,
          error: 'Transcript is empty. Please provide an answer to evaluate.',
        },
        { status: 400 }
      );
    }

    const question = questionId ? getQuestionById(questionId) : undefined;
    const effectiveQuestion =
      question ||
      (customQuestionText
        ? {
            id: 'custom',
            category: 'fresher' as const,
            title: 'Custom Question',
            questionText: customQuestionText,
            context: 'User submitted custom question',
            difficulty: 'Intermediate' as const,
            keyPoints: ['Direct answer', 'Specific examples', 'Clear structure', 'Key learnings'],
            sampleGoodAnswer:
              'A well-structured response following the STAR format with concrete outcomes.',
            sampleWeakAnswer: 'A vague or disorganized answer with lack of depth.',
          }
        : undefined);

    const evaluation = evaluateAnswer(transcript, effectiveQuestion || 'fresher-1');

    return NextResponse.json({
      success: true,
      evaluation,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error evaluating answer.';
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

