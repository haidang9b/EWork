£
6D:\Dacntt2\Source\EW\EW.Repository\IDatabaseFactory.cs
	namespace 	
EW
 
. 

Repository 
{ 
public 

	interface 
IDatabaseFactory %
<% &
T& '
>' (
where) .
T/ 0
:1 2

BaseEntity3 =
{ 

IQueryable 
< 
T 
> 
ExecuteDBStored %
(% &
string& ,

storedName- 7
,7 8
params9 ?
object@ F
[F G
]G H

parametersI S
)S T
;T U
} 
}		 ã
1D:\Dacntt2\Source\EW\EW.Repository\IRepository.cs
	namespace 	
EW
 
. 

Repository 
{ 
public 

	interface 
IRepository  
<  !
TEntity! (
>( )
where* /
TEntity0 7
:8 9

BaseEntity: D
{ 
void 
Delete 
( 
TEntity 
entity "
)" #
;# $
void		 
DeleteRange		 
(		 
IEnumerable		 $
<		$ %
TEntity		% ,
>		, -
entities		. 6
)		6 7
;		7 8
void

 
Update

 
(

 
TEntity

 
entity

 "
)

" #
;

# $
TEntity 
InsertOrUpdate 
( 
TEntity &
entity' -
)- .
;. /
void 
UpdateRange 
( 
IEnumerable $
<$ %
TEntity% ,
>, -
entities. 6
)6 7
;7 8
Task 
< 
TEntity 
> 
	FindAsync 
(  
long  $
id% '
)' (
;( )
Task 
AddAsync 
( 
TEntity 
entity $
)$ %
;% &
Task 
AddRangeAsync 
( 
IEnumerable &
<& '
TEntity' .
>. /
entities0 8
)8 9
;9 :
Task 
< 
IList 
< 
TEntity 
> 
> 
GetAsync %
(% &

Expression& 0
<0 1
Func1 5
<5 6
TEntity6 =
,= >
bool? C
>C D
>D E
	predicateF O
,O P
stringQ W
includePropertiesX i
=j k
$strl n
)n o
;o p
Task 
< 
TEntity 
> 
FirstOrDefaultAsync )
() *

Expression* 4
<4 5
Func5 9
<9 :
TEntity: A
,A B
boolC G
>G H
>H I
	predicateJ S
,S T
stringU [
includeProperties\ m
=n o
$strp r
)r s
;s t
Task 
< 
IEnumerable 
< 
TEntity  
>  !
>! "
GetAllAsync# .
(. /
string/ 5
includeProperties6 G
=H I
$strJ L
)L M
;M N
} 
} Ÿ
1D:\Dacntt2\Source\EW\EW.Repository\IUnitOfWork.cs
	namespace 	
EW
 
. 

Repository 
{ 
public 

	interface 
IUnitOfWork  
{ 
Task 
< 
bool 
> 
SaveChangeAsync "
(" #
)# $
;$ %
void 
BeginTransaction 
( 
) 
;  
void		 
Commit		 
(		 
)		 
;		 
void

 
RollBack

 
(

 
)

 
;

 
IRepository 
< 
TEntity 
> 

Repository '
<' (
TEntity( /
>/ 0
(0 1
)1 2
where3 8
TEntity9 @
:A B

BaseEntityC M
;M N
} 
} 