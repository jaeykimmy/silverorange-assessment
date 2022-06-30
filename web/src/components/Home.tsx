import React from 'react';

export default function Home(props: any) {
  return (
    <div className="App">
      {props.repos.length > 0 && (
        <div>
          {(props.repos as unknown as any[])
            .sort(function (a, b) {
              return (
                new Date(a.created_at).valueOf() -
                new Date(b.created_at).valueOf()
              );
            })
            .reverse()
            .map((x: any) => (
              <>
                <div key={x.id}>{x.name}</div>
                <p>{x.description}</p>
                <p>{x.language}</p>
                <p>{x.forks_count}</p>
                <p>{x.created_at}</p>
              </>
            ))}
        </div>
      )}
    </div>
  );
}
