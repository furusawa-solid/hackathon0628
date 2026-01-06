import { Heading } from '../../components/ui/Heading';

export const NotFound = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-y-3 rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-lg">
      <Heading level={3} className="font-bold text-xl text-yellow-400">
        ページが見つかりませんでした
      </Heading>
      <p>URLを確認してください。</p>
    </div>
  );
};
