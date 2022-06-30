import React from 'react';

export default function RepoInfo(props: any) {
  return (
    <div className="App">
      {props.repos.length > 0 && (
        <div>
          {(props.repos as unknown as any[]).map((x: any) => (
            <>
              <div key={x.id}>{x.name}</div>
              <p>{x.owner.login}</p>
              <p>{x.pushed_at}</p>
              <p>{x.forks_count}</p>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
